#!/usr/bin/env node

import signale from "signale";
import boxen from "boxen";
import yargs from "yargs";

import { generateEslintConfig, getConfigDependencies } from "generator";
import { writeEslintConfig } from "writer/linter-config/fileWriter";
import { createDefaultConfigContainer, findESLintConfigurationFiles } from "parser/linter-config-parser";
import { ClinterModeInfo, ProjectInfoObject } from "types";
import { installDevDependencies } from "dependencies/dependencies";
import { assertUnreachable } from "utils/utility";
import { getClinterSettings } from "parser/clinter-settings";
import { logClinterSettings } from "logger/clinter-settings";
import { migrateProjectESLint } from "migration";

async function runGeneratorMode(userAnswers: ProjectInfoObject, dirPath: string) {
  signale.info("Generating ESLint configuration ...");
  const eslintConfig = generateEslintConfig(userAnswers);
  signale.success("ESLint config generated");
  signale.info("Installing required dependencies ...");
  await installDevDependencies(getConfigDependencies(userAnswers), dirPath);
  signale.success("All dependencies successfully Installed");
  writeEslintConfig(createDefaultConfigContainer(dirPath, eslintConfig));
  signale.success("ESLint config written to eslintrc.json file");
}

async function runUpgradeMode(userAnswers: ProjectInfoObject, dirPath: string) {
  signale.info("Adapting exisiting ESLint configuration ...");
  const existingConfigContainer = findESLintConfigurationFiles(dirPath)[0];
  const eslintConfig = generateEslintConfig(userAnswers, existingConfigContainer.config);
  signale.success("ESLint config generated from previous configuration");
  signale.info("Installing required dependencies ...");
  await installDevDependencies(getConfigDependencies(userAnswers), dirPath);
  signale.success("All dependencies successfully Installed");
  writeEslintConfig({ ...existingConfigContainer, config: eslintConfig });
  signale.success(`ESLint config written to ${existingConfigContainer.file.name}`);
}

async function main() {
  // Check node version
  const nodeVersion = parseFloat(process.versions.node);
  if (nodeVersion < 12) {
    signale.error(
      `Node version is not compatible with clinter. Required version: > 12. Installed version: ${nodeVersion}`
    );
    process.exit(0);
  }

  const { dirPath, inputFile, auto } = yargs.options({
    dirPath: { type: "string", default: process.cwd(), alias: "path" },
    inputFile: { type: "string" },
    auto: { type: "boolean" },
  }).argv;

  signale.log(
    boxen("Welcome to the Clinter ! \n A simple linter config generator and upgrader", {
      padding: 1,
      borderColor: "green",
      align: "center",
      float: "center",
      margin: 3,
    })
  );

  signale.info("Retrieveing project info and settings ...");
  const { generatorConfig, modeConfig, migrationModeConfig } = await getClinterSettings(inputFile, auto, dirPath);
  signale.success("Project settings successfully retrieved !");
  logClinterSettings({ generatorConfig, modeConfig, migrationModeConfig });

  /**
   * Generate new ESLint configuration or adapt from existing one
   */

  switch (modeConfig.mode) {
    case ClinterModeInfo.Generator:
      await runGeneratorMode(generatorConfig, dirPath);
      break;

    case ClinterModeInfo.Upgrade:
      await runUpgradeMode(generatorConfig, dirPath);
      break;

    default:
      assertUnreachable(modeConfig.mode);
  }

  /**
   * Migrate the project by ignoring all errors
   */
  if (migrationModeConfig.migration) {
    signale.info("Inserting ignore comments to ease project migration ...");
    await migrateProjectESLint(dirPath);
    signale.success("Ignore comments sucessfully inserted !");
  }
}

void main();

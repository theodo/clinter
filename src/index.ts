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
  const { dirPath, inputFile } = yargs.options({
    dirPath: { type: "string", default: process.cwd(), alias: "path" },
    inputFile: { type: "string" },
  }).argv;

  signale.log(
    boxen("Welcome to the ESLint Config Generator", {
      padding: 1,
      borderColor: "green",
      align: "center",
      float: "center",
      margin: 3,
    })
  );

  const { generatorConfig, modeConfig } = await getClinterSettings(inputFile, dirPath);

  /**
   * Generate new ESLint configuration or adapt from existing one
   */

  switch (modeConfig.mode) {
    case ClinterModeInfo.Generator:
      return runGeneratorMode(generatorConfig, dirPath);

    case ClinterModeInfo.Upgrade:
      return runUpgradeMode(generatorConfig, dirPath);

    default:
      assertUnreachable(modeConfig.mode);
  }
}

void main();

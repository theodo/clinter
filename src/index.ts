#!/usr/bin/env node

import signale from "signale";
import boxen from "boxen";
import yargs from "yargs";

import { generateEslintConfig, getConfigDependencies } from "generator";
import { writeEslintConfig } from "writer/linterConfig/fileWriter";
import { createDefaultConfigContainer, findESLintConfigurationFiles } from "parser/linterConfig";
import { AnswerObject, ModeAnswer } from "types";
import { installDevDependencies } from "dependencies/dependencies";
import { assertUnreachable } from "utils/utility";
import { parseInputConfigFile, parseInputConfigQuestions } from "parser/inputConfig";

async function runGeneratorMode(userAnswers: AnswerObject, dirPath: string) {
  signale.info("Generating ESLint configuration ...");
  const eslintConfig = generateEslintConfig(userAnswers);
  signale.success("ESLint config generated");
  signale.info("Installing required dependencies ...");
  await installDevDependencies(getConfigDependencies(userAnswers), dirPath);
  signale.success("All dependencies successfully Installed");
  writeEslintConfig(createDefaultConfigContainer(dirPath, eslintConfig));
  signale.success("ESLint config written to eslintrc.json file");
}

async function runUpgradeMode(userAnswers: AnswerObject, dirPath: string) {
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

  const { generatorConfig, modeConfig } =
    inputFile !== undefined ? parseInputConfigFile(inputFile) : await parseInputConfigQuestions();

  /**
   * Generate new ESLint configuration or adapt from existing one
   */

  switch (modeConfig.mode) {
    case ModeAnswer.Generator:
      return runGeneratorMode(generatorConfig, dirPath);

    case ModeAnswer.Upgrade:
      return runUpgradeMode(generatorConfig, dirPath);

    default:
      assertUnreachable(modeConfig.mode);
  }
}

void main();

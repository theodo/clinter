#!/usr/bin/env node

import signale from "signale";
import boxen from "boxen";
import path from "path";

import { promptGeneratorUserQuestions, promptModeUserQuestions } from "parser/userQuestions";
import { generateEslintConfig, getConfigDependencies } from "generator";
import { writeEslintConfig } from "parser/fileWriter/fileWriter";
import { createDefaultConfigContainer, findESLintConfigurationFiles } from "parser/configFile";
import { ModeAnswer } from "types";
import { installDevDependencies } from "dependencies/dependencies";

function getDirPath(): string {
  const args = process.argv.splice(2);

  if (args.length === 0) {
    return process.cwd();
  }

  const inputPath = args[0];

  return path.resolve(inputPath);
}

async function main() {
  const dirPath = getDirPath();

  signale.log(
    boxen("Welcome to the ESLint Config Generator", {
      padding: 1,
      borderColor: "green",
      align: "center",
      float: "center",
      margin: 3,
    })
  );

  /**
   * Ask Mode Question
   */

  const userModeAnswers = await promptModeUserQuestions();

  /**
   * Ask ESLINT Configuration Questions
   */

  const userGeneratorAnswers = await promptGeneratorUserQuestions();
  signale.info("Retrieving answers ...");

  /**
   * Generate new ESLint configuration or adapt from existing one
   */

  switch (userModeAnswers.mode) {
    case ModeAnswer.Generator: {
      signale.info("Generating ESLint configuration ...");
      const eslintConfig = generateEslintConfig(userGeneratorAnswers);
      signale.success("ESLint config generated");
      signale.info("Installing required dependencies ...");
      await installDevDependencies(getConfigDependencies(userGeneratorAnswers), dirPath);
      signale.success("All dependencies successfully Installed");
      writeEslintConfig(createDefaultConfigContainer(__dirname, eslintConfig));
      signale.success("ESLint config written to eslintrc.json file");
      break;
    }

    case ModeAnswer.Upgrade: {
      signale.info("Adapting exisiting ESLint configuration ...");
      const existingConfigContainer = findESLintConfigurationFiles(dirPath)[0];
      const eslintConfig = generateEslintConfig(userGeneratorAnswers, existingConfigContainer.config);
      signale.success("ESLint config generated from previous configuration");
      signale.info("Installing required dependencies ...");
      await installDevDependencies(getConfigDependencies(userGeneratorAnswers), dirPath);
      signale.success("All dependencies successfully Installed");
      writeEslintConfig({ ...existingConfigContainer, config: eslintConfig });
      signale.success(`ESLint config written to ${existingConfigContainer.file.name}`);
      break;
    }

    default:
      break;
  }
}

void main();

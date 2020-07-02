import signale from "signale";
import boxen from "boxen";
import { existsSync } from "fs";
import path from "path";

import { promptGeneratorUserQuestions, promptModeUserQuestions } from "parser/userQuestions";
import { generateEslintConfig } from "generator";
import { writeEslintConfig } from "fileWriter";
import { findESLintConfigurationFiles } from "parser/configFile";
import { ModeAnswer } from "types";

function getDirPath(): string {
  const args = process.argv.splice(2);

  if (args.length === 0) {
    return process.cwd();
  }

  const currentDir = process.cwd();
  const inputPath = args[0];

  return existsSync(inputPath) ? inputPath : path.join(currentDir, inputPath);
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
      writeEslintConfig(eslintConfig, "eslintrc.json");
      signale.success("ESLint config written to eslintrc.json file");
      break;
    }

    case ModeAnswer.Upgrade: {
      signale.info("Adapting exisiting ESLint configuration ...");
      const existingConfigContainer = findESLintConfigurationFiles(dirPath)[0];
      const eslintConfig = generateEslintConfig(userGeneratorAnswers, existingConfigContainer.config);
      signale.success("ESLint config generated from previous configuration");
      writeEslintConfig(eslintConfig, existingConfigContainer.fileName);
      signale.success(`ESLint config written to ${existingConfigContainer.fileName}`);
      break;
    }

    default:
      break;
  }
}

void main();

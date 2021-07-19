#!/usr/bin/env node

import signale from "signale";
import boxen from "boxen";
import yargs from "yargs/yargs";

import { generateEslintConfig, getConfigDependencies } from "generator";
import { writeEslintConfig } from "writer/linter-config/fileWriter";
import { createDefaultConfigContainer, findESLintConfigurationFiles } from "parser/linter-config-parser";
import { ClinterModeInfo, DependenciesConfigObject, ProjectInfoObject, TypescriptInfo } from "types";
import { installDevDependencies } from "dependencies/dependencies";
import { assertUnreachable } from "utils/utility";
import { getClinterSettings } from "parser/clinter-settings";
import { logClinterSettings } from "logger/clinter-settings";
import { migrateProjectESLint } from "migration";
import { hasTSStrictNullChecks } from "parser/typescript-config";

async function adaptUserAnswersTSConfig(userAnswers: ProjectInfoObject, dirPath: string): Promise<ProjectInfoObject> {
  if (userAnswers.typescript === TypescriptInfo.None || userAnswers.typescript === TypescriptInfo.NoTypeChecking) {
    return userAnswers;
  }

  signale.info("Checking TS configuration pour strict null checks");

  try {
    const hasStrictNullChecks = await hasTSStrictNullChecks(dirPath);
    if (!hasStrictNullChecks) {
      signale.warn(
        "Clinter detected you are not using the strictNullChecks rule in your TS configuration ! The linter configuration quality will be impacted as a result. It is recommended to migrate your project to include strict null checks before running Clinter."
      );

      return { ...userAnswers, typescript: TypescriptInfo.NoTypeChecking };
    }
  } catch (error) {
    signale.error(
      "Failed to parse your project's TS configuration file. Defaulting to a strict TS configuration by default with strict null checks"
    );
  }

  signale.info("TS configuration successfully checked");

  return userAnswers;
}

async function runGeneratorMode(
  userAnswers: ProjectInfoObject,
  dirPath: string,
  dependenciesConfig: DependenciesConfigObject
) {
  signale.info("Generating ESLint configuration ...");
  const eslintConfig = generateEslintConfig(userAnswers);
  signale.success("ESLint config generated");

  if (dependenciesConfig.upgradeDependencies) {
    signale.info("Installing required dependencies ...");
    await installDevDependencies(getConfigDependencies(userAnswers), dirPath);
    signale.success("All dependencies successfully Installed");
  } else {
    signale.info("Skipping dependencies upgrade");
  }

  writeEslintConfig(createDefaultConfigContainer(dirPath, eslintConfig));
  signale.success("ESLint config written to eslintrc.json file");
}

async function runUpgradeMode(
  userAnswers: ProjectInfoObject,
  dirPath: string,
  dependenciesConfig: DependenciesConfigObject
) {
  signale.info("Adapting exisiting ESLint configuration ...");
  const existingConfigContainer = findESLintConfigurationFiles(dirPath)[0];
  const eslintConfig = generateEslintConfig(userAnswers, existingConfigContainer.config);
  signale.success("ESLint config generated from previous configuration");

  if (dependenciesConfig.upgradeDependencies) {
    signale.info("Installing required dependencies ...");
    await installDevDependencies(getConfigDependencies(userAnswers), dirPath);
    signale.success("All dependencies successfully Installed");
  } else {
    signale.info("Skipping dependencies upgrade");
  }

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

  const { dirPath, inputFile, auto, disableErrors } = yargs(process.argv.slice(2))
    .options({
      dirPath: {
        type: "string",
        default: process.cwd(),
        alias: "path",
        description: "The path of the directory where a configuration should be generated or upgraded",
      },
      inputFile: { type: "string", description: "Path to a file that contains the clinter input settings" },
      auto: { type: "boolean", description: "Tell clinter to run in automatic or manual mode" },
      disableErrors: {
        type: "boolean",
        argv: "disable-errors",
        description: "Run clinter's automatic fix of all eslint issues by disabling them in the code",
      },
    })
    .parseSync();

  signale.log(
    boxen("Welcome to the Clinter ! \n A simple linter config generator and upgrader", {
      padding: 1,
      borderColor: "green",
      align: "center",
      float: "center",
      margin: 3,
    })
  );

  if (disableErrors === true) {
    signale.info("Inserting ignore comments to ease project migration ...");
    const { errorCount, fixableErrorCount } = await migrateProjectESLint(dirPath);
    signale.success(`Ignore comments sucessfully inserted for ${errorCount - fixableErrorCount} eslint errors !`);
    signale.info(`${fixableErrorCount} fixable errors detected. Run eslint with the --fix option to fix them`);
    return;
  }

  signale.info("Retrieveing project info and settings ...");
  const {
    generatorConfig: clinterSettings,
    modeConfig,
    migrationModeConfig,
    dependenciesConfig,
  } = await getClinterSettings(inputFile, auto, dirPath);
  signale.success("Project settings successfully retrieved !");
  logClinterSettings({ generatorConfig: clinterSettings, modeConfig, migrationModeConfig, dependenciesConfig });

  /**
   * Check and adapt user answers based on user TS configuration
   */

  const generatorConfig = await adaptUserAnswersTSConfig(clinterSettings, dirPath);

  /**
   * Generate new ESLint configuration or adapt from existing one
   */

  switch (modeConfig.mode) {
    case ClinterModeInfo.Generator:
      await runGeneratorMode(generatorConfig, dirPath, dependenciesConfig);
      break;

    case ClinterModeInfo.Upgrade:
      await runUpgradeMode(generatorConfig, dirPath, dependenciesConfig);
      break;

    default:
      assertUnreachable(modeConfig.mode);
  }
  /**
   * Migrate the project by ignoring all errors
   */
  if (migrationModeConfig.migration) {
    signale.info("Inserting ignore comments to ease project migration ...");
    const { errorCount, fixableErrorCount } = await migrateProjectESLint(dirPath);
    signale.success(`Ignore comments sucessfully inserted for ${errorCount - fixableErrorCount} eslint errors !`);
    signale.info(`${fixableErrorCount} fixable errors detected. Run eslint with the --fix option to fix them`);
  }
}

void main();

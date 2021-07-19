import { inferClinterMode } from "parser/clinter-mode";
import { parseInputConfigFile } from "parser/clinter-settings-input-parser";
import { parseProjectDependencies } from "parser/project-dependencies";
import { inferProjectInfo } from "parser/project-info-inferer";
import { ProjectInfoRetrievalMode } from "parser/project-info-inferer/types";
import {
  promptGeneratorUserQuestions,
  promptMigrationModeQuestions,
  promptModeUserQuestions,
  promptProjectInfoRetrievalModeQuestions,
} from "parser/user-questions";
import { ClinterSettings } from "types";
import { assertUnreachable } from "utils/utility";

export const getClinterSettings = async (
  inputFile: string | undefined,
  auto: boolean | undefined,
  dirPath: string
): Promise<ClinterSettings> => {
  if (inputFile !== undefined) {
    return parseInputConfigFile(inputFile);
  }

  const projectDependencies = parseProjectDependencies(dirPath);

  if (auto === true) {
    return {
      modeConfig: inferClinterMode(dirPath),
      generatorConfig: inferProjectInfo({ dirPath, projectDependencies }),
      migrationModeConfig: {
        migration: false,
      },
      dependenciesConfig: {
        upgradeDependencies: true,
      },
    };
  }

  const configRetrievalModeInfo = await promptProjectInfoRetrievalModeQuestions();

  switch (configRetrievalModeInfo.mode) {
    case ProjectInfoRetrievalMode.Automatic:
      return {
        modeConfig: inferClinterMode(dirPath),
        generatorConfig: inferProjectInfo({ dirPath, projectDependencies }),
        migrationModeConfig: await promptMigrationModeQuestions(),
        dependenciesConfig: {
          upgradeDependencies: true,
        },
      };

    case ProjectInfoRetrievalMode.Manual: {
      const modeConfig = await promptModeUserQuestions();
      const generatorConfig = await promptGeneratorUserQuestions();

      return {
        generatorConfig,
        modeConfig,
        migrationModeConfig: await promptMigrationModeQuestions(),
        dependenciesConfig: {
          upgradeDependencies: true,
        },
      };
    }

    default:
      return assertUnreachable(configRetrievalModeInfo.mode);
  }
};

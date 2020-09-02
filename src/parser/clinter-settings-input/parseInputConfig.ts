import signale from "signale";

import {
  promptGeneratorUserQuestions,
  promptModeUserQuestions,
  promptProjectInfoRetrievalModeQuestions,
} from "parser/user-questions";
import { InputConfig } from "parser/clinter-settings-input/types";
import { ProjectInfoRetrievalMode } from "parser/project-info-inferer/types";

export async function parseInputConfig(): Promise<InputConfig> {
  const projectInfoRetrievalMode = await promptProjectInfoRetrievalModeQuestions();

  const modeConfig = await promptModeUserQuestions();

  const generatorConfig = await promptGeneratorUserQuestions();
  signale.info("Retrieving project settings ...");

  return {
    modeConfig,
    generatorConfig,
  };
}

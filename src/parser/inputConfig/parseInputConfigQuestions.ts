import signale from "signale";

import { promptGeneratorUserQuestions, promptModeUserQuestions } from "parser/userQuestions";
import { InputConfig } from "parser/inputConfig/types";

export async function parseInputConfigQuestions(): Promise<InputConfig> {
  const modeConfig = await promptModeUserQuestions();

  const generatorConfig = await promptGeneratorUserQuestions();
  signale.info("Retrieving project settings ...");

  return {
    modeConfig,
    generatorConfig,
  };
}

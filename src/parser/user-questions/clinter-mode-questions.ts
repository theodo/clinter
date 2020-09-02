import inquirer from "inquirer";
import { ClinterModeInfo, ClinterModeInfoObject } from "types";

const ModeQuestion: inquirer.ListQuestion<ClinterModeInfoObject> = {
  name: "mode",
  default: ClinterModeInfo.Generator,
  message: "This tool can either generate a new configuration or upgrade an already existing one. Choose your mode.",
  type: "list",
  choices: Object.values(ClinterModeInfo),
};

export async function promptModeUserQuestions(): Promise<ClinterModeInfoObject> {
  return inquirer.prompt(ModeQuestion);
}

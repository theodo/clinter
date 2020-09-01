import inquirer from "inquirer";
import { ModeInfo, ModeInfoObject } from "types";

const ModeQuestion: inquirer.ListQuestion<ModeInfoObject> = {
  name: "mode",
  default: ModeInfo.Generator,
  message: "This tool can either generate a new configuration or upgrade an already existing one. Choose your mode.",
  type: "list",
  choices: Object.values(ModeInfo),
};

export async function promptModeUserQuestions(): Promise<ModeInfoObject> {
  return inquirer.prompt(ModeQuestion);
}

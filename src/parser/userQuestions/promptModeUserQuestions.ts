import inquirer from "inquirer";
import { ModeAnswer, ModeAnswerObject } from "types";

const ModeQuestion: inquirer.ListQuestion<ModeAnswerObject> = {
  name: "mode",
  default: ModeAnswer.Generator,
  message: "This tool can either generate a new configuration or upgrade an already existing one. Choose your mode.",
  type: "list",
  choices: Object.values(ModeAnswer),
};

export async function promptModeUserQuestions(): Promise<ModeAnswerObject> {
  return inquirer.prompt(ModeQuestion);
}

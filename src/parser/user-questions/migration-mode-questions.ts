import inquirer from "inquirer";
import { MigrationModeInfoObject } from "types";

const MigrationModeQuestion: inquirer.ConfirmQuestion<MigrationModeInfoObject> = {
  name: "migration",
  default: false,
  message: "Should clinter migrate your project by inserting error ignores in the code ?",
  type: "confirm",
};

export async function promptMigrationModeQuestions(): Promise<MigrationModeInfoObject> {
  return inquirer.prompt(MigrationModeQuestion);
}

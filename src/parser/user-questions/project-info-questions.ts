import inquirer from "inquirer";
import { ProjectInfoRetrievalMode, ProjectInfoRetrievalModeObject } from "parser/project-info-inferer/types";

const ModeQuestion: inquirer.ListQuestion<ProjectInfoRetrievalModeObject> = {
  name: "mode",
  default: ProjectInfoRetrievalMode.Automatic,
  message: "Choose how clinter should retrieve project settings",
  type: "list",
  choices: Object.values(ProjectInfoRetrievalMode),
};

export async function promptProjectInfoRetrievalModeQuestions(): Promise<ProjectInfoRetrievalModeObject> {
  return inquirer.prompt(ModeQuestion);
}

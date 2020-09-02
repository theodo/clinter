import inquirer, { QuestionCollection } from "inquirer";
import {
  EnvInfo,
  EnvInfoObject,
  FormatterInfo,
  FormatterInfoObject,
  FrontFrameworkInfo,
  FrontFrameworkInfoObject,
  ProjectInfoObject,
  TestFrameworkInfo,
  TestFrameworkInfoObject,
  TypescriptInfo,
  TypescriptInfoObject,
} from "types";

const FrontFrameworkQuestion: inquirer.ListQuestion<FrontFrameworkInfoObject> = {
  name: "frontFramework",
  default: FrontFrameworkInfo.None,
  message: "Front Framework",
  type: "list",
  choices: Object.values(FrontFrameworkInfo),
};

const FormatterQuestion: inquirer.ListQuestion<FormatterInfoObject> = {
  name: "formatter",
  default: FormatterInfo.Prettier,
  message: "Are you using a formatter?",
  type: "list",
  choices: Object.values(FormatterInfo),
};

const TypescriptQuestion: inquirer.ListQuestion<TypescriptInfoObject> = {
  name: "typescript",
  default: TypescriptInfo.WithTypeChecking,
  message: "Are you using typescript? What kind of eslint configuration would you like?",
  type: "list",
  choices: Object.values(TypescriptInfo),
};

const EnvQuestion: inquirer.CheckboxQuestion<EnvInfoObject> = {
  name: "env",
  default: [EnvInfo.Browser, EnvInfo.Node],
  message: "For which environment are you developing?",
  type: "checkbox",
  choices: Object.values(EnvInfo),
};

const TestFrameworkQuestion: inquirer.ListQuestion<TestFrameworkInfoObject> = {
  name: "test",
  default: TestFrameworkInfo.None,
  message: "Will you be writing tests?",
  type: "list",
  choices: Object.values(TestFrameworkInfo),
};

const questions: QuestionCollection<ProjectInfoObject> = [
  TypescriptQuestion,
  FrontFrameworkQuestion,
  FormatterQuestion,
  EnvQuestion,
  TestFrameworkQuestion,
];

export async function promptGeneratorUserQuestions(): Promise<ProjectInfoObject> {
  return inquirer.prompt(questions);
}

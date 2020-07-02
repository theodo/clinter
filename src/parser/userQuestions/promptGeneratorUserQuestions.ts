import inquirer, { QuestionCollection } from "inquirer";
import {
  AnswerObject,
  EnvAnswer,
  EnvAnswerObject,
  FormatterAnswer,
  FormatterAnswerObject,
  FrontFrameworkAnswer,
  FrontFrameworkAnswerObject,
  TestFrameworkAnswer,
  TestFrameworkAnswerObject,
  TypescriptAnswer,
  TypescriptAnswerObject,
} from "types";

const FrontFrameworkQuestion: inquirer.ListQuestion<FrontFrameworkAnswerObject> = {
  name: "frontFramework",
  default: FrontFrameworkAnswer.None,
  message: "Front Framework",
  type: "list",
  choices: Object.values(FrontFrameworkAnswer),
};

const FormatterQuestion: inquirer.ListQuestion<FormatterAnswerObject> = {
  name: "formatter",
  default: FormatterAnswer.Prettier,
  message: "Are you using a formatter?",
  type: "list",
  choices: Object.values(FormatterAnswer),
};

const TypescriptQuestion: inquirer.ListQuestion<TypescriptAnswerObject> = {
  name: "typescript",
  default: TypescriptAnswer.WithTypeChecking,
  message: "Are you using typescript? What kind of eslint configuration would you like?",
  type: "list",
  choices: Object.values(TypescriptAnswer),
};

const EnvQuestion: inquirer.CheckboxQuestion<EnvAnswerObject> = {
  name: "env",
  default: [EnvAnswer.Browser, EnvAnswer.Node],
  message: "For which environment are you developing?",
  type: "checkbox",
  choices: Object.values(EnvAnswer),
};

const TestFrameworkQuestion: inquirer.ListQuestion<TestFrameworkAnswerObject> = {
  name: "test",
  default: TestFrameworkAnswer.None,
  message: "Will you be writing tests?",
  type: "list",
  choices: Object.values(TestFrameworkAnswer),
};

const questions: QuestionCollection<AnswerObject> = [
  TypescriptQuestion,
  FrontFrameworkQuestion,
  FormatterQuestion,
  EnvQuestion,
  TestFrameworkQuestion,
];

export async function promptGeneratorUserQuestions(): Promise<AnswerObject> {
  return inquirer.prompt(questions);
}

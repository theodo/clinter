export enum FormatterAnswer {
  None = "None",
  Prettier = "Prettier",
}

export interface FormatterAnswerObject {
  formatter: FormatterAnswer;
}

export enum FrontFrameworkAnswer {
  None = "None",
  Vue = "Vue",
  React = "React",
}

export interface FrontFrameworkAnswerObject {
  frontFramework: FrontFrameworkAnswer;
}

export enum TypescriptAnswer {
  None = "None",
  WithTypeChecking = "With type checking",
  NoTypeChecking = "Without type checking",
}

export interface TypescriptAnswerObject {
  typescript: TypescriptAnswer;
}

export enum EnvAnswer {
  Browser = "Browser",
  Node = "Node",
}

export interface EnvAnswerObject {
  env: EnvAnswer[];
}

export enum TestFrameworkAnswer {
  None = "None",
  Jest = "Jest",
}

export interface TestFrameworkAnswerObject {
  test: TestFrameworkAnswer;
}

export type AnswerObject = FormatterAnswerObject &
  FrontFrameworkAnswerObject &
  TypescriptAnswerObject &
  EnvAnswerObject &
  TestFrameworkAnswerObject;

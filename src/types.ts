export enum FormatterInfo {
  None = "None",
  Prettier = "Prettier",
}

export interface FormatterInfoObject {
  formatter: FormatterInfo;
}

export enum FrontFrameworkInfo {
  None = "None",
  Vue = "Vue",
  React = "React",
}

export interface FrontFrameworkInfoObject {
  frontFramework: FrontFrameworkInfo;
}

export enum TypescriptInfo {
  None = "None",
  WithTypeChecking = "With type checking",
  NoTypeChecking = "Without type checking",
}

export interface TypescriptInfoObject {
  typescript: TypescriptInfo;
}

export enum EnvInfo {
  Browser = "Browser",
  Node = "Node",
}

export interface EnvInfoObject {
  env: EnvInfo[];
}

export enum TestFrameworkInfo {
  None = "None",
  Jest = "Jest",
}

export interface TestFrameworkInfoObject {
  test: TestFrameworkInfo;
}

export type ProjectInfoObject = FormatterInfoObject &
  FrontFrameworkInfoObject &
  TypescriptInfoObject &
  EnvInfoObject &
  TestFrameworkInfoObject;

export enum ModeInfo {
  Generator = "Generator Mode",
  Upgrade = "Upgrade Mode",
}

export interface ModeInfoObject {
  mode: ModeInfo;
}

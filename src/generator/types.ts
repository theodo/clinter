import { Linter } from "eslint";
import { ProjectInfoObject } from "types";

export type ESLintGenerator = (userAnswers: ProjectInfoObject) => (config: Linter.Config) => Linter.Config;

export type ESLintDependencyGenerator = (userAnswers: ProjectInfoObject) => (deps: string[]) => string[];

export interface ESLintOverrider {
  files: string[];
}

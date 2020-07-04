import { Linter } from "eslint";
import { AnswerObject } from "types";

export type ESLintGenerator = (userAnswers: AnswerObject) => (config: Linter.Config) => Linter.Config;

export type ESLintDependencyGenerator = (userAnswers: AnswerObject) => (deps: string[]) => string[];

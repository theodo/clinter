import { ESLintGenerator, ESLintDependencyGenerator } from "generator/types";
import { identity } from "utility";
import { concatConfig, concatDependencies } from "generator/generate";
import { TestFrameworkAnswer } from "types";
import { jestESLintEnvConfig, jestESLintDependencies } from "generator/baseConfigs";

export const generateTestESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.test) {
    case TestFrameworkAnswer.None:
      return identity;

    case TestFrameworkAnswer.Jest:
      return concatConfig(jestESLintEnvConfig);
  }
};

export const getTestESLintDependencies: ESLintDependencyGenerator = (userAnswers) => {
  switch (userAnswers.test) {
    case TestFrameworkAnswer.None:
      return identity;

    case TestFrameworkAnswer.Jest:
      return concatDependencies(jestESLintDependencies);
  }
}
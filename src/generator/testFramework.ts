import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { identity } from "utils/utility";
import { concatConfig, concatDependencies } from "generator/generate";
import { TestFrameworkInfo } from "types";
import { jestESLintDependencies, jestESLintEnvConfig } from "generator/baseConfigs";

export const generateTestESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.test) {
    case TestFrameworkInfo.None:
      return identity;

    case TestFrameworkInfo.Jest:
      return concatConfig(jestESLintEnvConfig);
  }
};

export const getTestESLintDependencies: ESLintDependencyGenerator = (userAnswers) => {
  switch (userAnswers.test) {
    case TestFrameworkInfo.None:
      return identity;

    case TestFrameworkInfo.Jest:
      return concatDependencies(jestESLintDependencies);
  }
};

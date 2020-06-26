import { TestFrameworkAnswer } from "../types";
import { identity } from "../utility";
import { ESLintGenerator } from "./types";
import { jestESLintEnvConfig } from "./baseConfigs/envESLintConfig";
import { concatConfig } from "./generate";

export const generateTestESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.test) {
    case TestFrameworkAnswer.None:
      return identity;

    case TestFrameworkAnswer.Jest:
      return concatConfig(jestESLintEnvConfig);
  }
};

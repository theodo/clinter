import { ESLintGenerator } from "generator/types";
import { identity } from "utility";
import { concatConfig } from "generator/generate";
import { TestFrameworkAnswer } from "types";
import { jestESLintEnvConfig } from "generator/baseConfigs";

export const generateTestESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.test) {
    case TestFrameworkAnswer.None:
      return identity;

    case TestFrameworkAnswer.Jest:
      return concatConfig(jestESLintEnvConfig);
  }
};

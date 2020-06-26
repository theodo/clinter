import { FrontFrameworkAnswer, TypescriptAnswer } from "../types";
import { identity, pipe } from "../utility";
import { ESLintGenerator } from "./types";
import { concatConfig } from "./generate";
import { reactESLintConfig, reactTypescriptESLintConfig } from "./baseConfigs/reactESLintConfig";

export const generateFrontFrameworkESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.frontFramework) {
    case FrontFrameworkAnswer.None:
      return identity;

    case FrontFrameworkAnswer.Vue:
      return identity;

    case FrontFrameworkAnswer.React:
      return pipe(
        concatConfig(reactESLintConfig),
        userAnswers.typescript !== TypescriptAnswer.None ? concatConfig(reactTypescriptESLintConfig) : identity
      );
  }
};

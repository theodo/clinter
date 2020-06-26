import { ESLintGenerator } from "generator/types";
import { identity, pipe } from "utility";
import { concatConfig } from "generator/generate";
import { FrontFrameworkAnswer, TypescriptAnswer } from "types";
import { reactESLintConfig, reactTypescriptESLintConfig, vueESLintConfig } from "generator/baseConfigs";

export const generateFrontFrameworkESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.frontFramework) {
    case FrontFrameworkAnswer.None:
      return identity;

    case FrontFrameworkAnswer.Vue:
      return concatConfig(vueESLintConfig);

    case FrontFrameworkAnswer.React:
      return pipe(
        concatConfig(reactESLintConfig),
        userAnswers.typescript !== TypescriptAnswer.None ? concatConfig(reactTypescriptESLintConfig) : identity
      );
  }
};

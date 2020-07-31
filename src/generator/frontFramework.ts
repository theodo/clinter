import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { identity, pipe } from "utils/utility";
import { concatConfig, concatDependencies } from "generator/generate";
import { FrontFrameworkAnswer, TypescriptAnswer } from "types";
import {
  reactESLintConfig,
  reactESLintDependencies,
  reactTypescriptESLintConfig,
  vueESLintConfig,
  vueESLintDependencies,
} from "generator/baseConfigs";

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

export const getFrontFrameworkESLintDependencies: ESLintDependencyGenerator = (userAnswers) => {
  switch (userAnswers.frontFramework) {
    case FrontFrameworkAnswer.None:
      return identity;

    case FrontFrameworkAnswer.Vue:
      return concatDependencies(vueESLintDependencies);

    case FrontFrameworkAnswer.React:
      return concatDependencies(reactESLintDependencies);
  }
};

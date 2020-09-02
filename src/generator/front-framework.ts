import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { identity, pipe } from "utils/utility";
import { concatConfig, concatDependencies } from "generator/generate";
import { FrontFrameworkInfo, TypescriptInfo } from "types";
import {
  reactESLintConfig,
  reactESLintDependencies,
  reactTypescriptESLintConfig,
  vueESLintConfig,
  vueESLintDependencies,
} from "generator/base-configs";

export const generateFrontFrameworkESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.frontFramework) {
    case FrontFrameworkInfo.None:
      return identity;

    case FrontFrameworkInfo.Vue:
      return concatConfig(vueESLintConfig);

    case FrontFrameworkInfo.React:
      return pipe(
        concatConfig(reactESLintConfig),
        userAnswers.typescript !== TypescriptInfo.None ? concatConfig(reactTypescriptESLintConfig) : identity
      );
  }
};

export const getFrontFrameworkESLintDependencies: ESLintDependencyGenerator = (userAnswers) => {
  switch (userAnswers.frontFramework) {
    case FrontFrameworkInfo.None:
      return identity;

    case FrontFrameworkInfo.Vue:
      return concatDependencies(vueESLintDependencies);

    case FrontFrameworkInfo.React:
      return concatDependencies(reactESLintDependencies);
  }
};

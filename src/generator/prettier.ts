import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { identity, pipe } from "utils/utility";
import { concatConfig, concatDependencies } from "generator/generate";
import { FormatterInfo, FrontFrameworkInfo, TypescriptInfo } from "types";
import {
  prettierESLintConfig,
  prettierESLintDependencies,
  prettierReactESLintConfig,
  prettierTypescriptESLintConfig,
  prettierVueESLintConfig,
} from "generator/base-configs";

const generatePrettierTypescriptESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.typescript) {
    case TypescriptInfo.None:
      return identity;

    case TypescriptInfo.NoTypeChecking:
    case TypescriptInfo.WithTypeChecking:
      return concatConfig(prettierTypescriptESLintConfig);
  }
};

const generatePrettierReactESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.frontFramework) {
    case FrontFrameworkInfo.React:
      return concatConfig(prettierReactESLintConfig);

    case FrontFrameworkInfo.Vue:
      return concatConfig(prettierVueESLintConfig);

    default:
      return identity;
  }
};

export const generatePrettierESlintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.formatter) {
    case FormatterInfo.None:
      return identity;

    case FormatterInfo.Prettier:
      return pipe(
        concatConfig(prettierESLintConfig),
        generatePrettierTypescriptESLintConfig(userAnswers),
        generatePrettierReactESLintConfig(userAnswers)
      );
  }
};

export const getPrettierESLintDependencies: ESLintDependencyGenerator = (userAnswers) => {
  switch (userAnswers.formatter) {
    case FormatterInfo.None:
      return identity;

    case FormatterInfo.Prettier:
      return concatDependencies(prettierESLintDependencies);
  }
};

import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { identity, pipe } from "utils/utility";
import { concatConfig, concatDependencies } from "generator/generate";
import { FormatterAnswer, FrontFrameworkAnswer, TypescriptAnswer } from "types";
import {
  prettierESLintConfig,
  prettierESLintDependencies,
  prettierReactESLintConfig,
  prettierTypescriptESLintConfig,
  prettierVueESLintConfig,
} from "generator/baseConfigs";

const generatePrettierTypescriptESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.typescript) {
    case TypescriptAnswer.None:
      return identity;

    case TypescriptAnswer.NoTypeChecking:
    case TypescriptAnswer.WithTypeChecking:
      return concatConfig(prettierTypescriptESLintConfig);
  }
};

const generatePrettierReactESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.frontFramework) {
    case FrontFrameworkAnswer.React:
      return concatConfig(prettierReactESLintConfig);

    case FrontFrameworkAnswer.Vue:
      return concatConfig(prettierVueESLintConfig);

    default:
      return identity;
  }
};

export const generatePrettierESlintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.formatter) {
    case FormatterAnswer.None:
      return identity;

    case FormatterAnswer.Prettier:
      return pipe(
        concatConfig(prettierESLintConfig),
        generatePrettierTypescriptESLintConfig(userAnswers),
        generatePrettierReactESLintConfig(userAnswers)
      );
  }
};

export const getPrettierESLintDependencies: ESLintDependencyGenerator = (userAnswers) => {
  switch (userAnswers.formatter) {
    case FormatterAnswer.None:
      return identity;

    case FormatterAnswer.Prettier:
      return concatDependencies(prettierESLintDependencies);
  }
};

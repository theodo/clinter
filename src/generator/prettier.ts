import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { identity, pipe } from "utils/utility";
import { concatConfig, concatDependencies } from "generator/generate";
import { FormatterInfo, TypescriptInfo } from "types";
import { prettierESLintConfig, prettierESLintDependencies, tsOverrider } from "generator/base-configs";
import { wrapConfigInOverride } from "generator/override";

const generatePrettierTypescriptESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.typescript) {
    case TypescriptInfo.None:
      return identity;

    case TypescriptInfo.NoTypeChecking:
    case TypescriptInfo.WithTypeChecking:
      return concatConfig(wrapConfigInOverride(tsOverrider)(prettierESLintConfig));
  }
};

export const generatePrettierESlintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.formatter) {
    case FormatterInfo.None:
      return identity;

    case FormatterInfo.Prettier:
      return pipe(concatConfig(prettierESLintConfig), generatePrettierTypescriptESLintConfig(userAnswers));
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

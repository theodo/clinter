import { TypescriptInfo } from "types";
import { identity, pipe } from "utils/utility";
import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { concatConfig, concatDependencies } from "generator/generate";
import {
  typescriptBaseEslintConfig,
  typescriptESLintDependencies,
  typescriptTypeEslintConfig,
} from "generator/base-configs/typescriptEslintConfig";

export const generateTypescriptESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.typescript) {
    case TypescriptInfo.None:
      return identity;

    case TypescriptInfo.WithTypeChecking:
      return pipe(concatConfig(typescriptBaseEslintConfig), concatConfig(typescriptTypeEslintConfig));

    case TypescriptInfo.NoTypeChecking:
      return concatConfig(typescriptBaseEslintConfig);
  }
};

export const getTypescriptESLintDependencies: ESLintDependencyGenerator = (userAnswers) => {
  switch (userAnswers.typescript) {
    case TypescriptInfo.None:
      return identity;

    case TypescriptInfo.WithTypeChecking:
    case TypescriptInfo.NoTypeChecking:
      return concatDependencies(typescriptESLintDependencies);
  }
};

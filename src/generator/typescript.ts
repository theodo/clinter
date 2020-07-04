import { TypescriptAnswer } from "types";
import { identity, pipe } from "utility";
import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { concatConfig, concatDependencies } from "generator/generate";
import {
  typescriptBaseEslintConfig,
  typescriptESLintDependencies,
  typescriptTypeEslintConfig,
} from "generator/baseConfigs/typescriptEslintConfig";

export const generateTypescriptESLintConfig: ESLintGenerator = (userAnswers) => {
  switch (userAnswers.typescript) {
    case TypescriptAnswer.None:
      return identity;

    case TypescriptAnswer.WithTypeChecking:
      return pipe(concatConfig(typescriptBaseEslintConfig), concatConfig(typescriptTypeEslintConfig));

    case TypescriptAnswer.NoTypeChecking:
      return concatConfig(typescriptBaseEslintConfig);
  }
};

export const getTypescriptESLintDependencies: ESLintDependencyGenerator = (userAnswers) => {
  switch (userAnswers.typescript) {
    case TypescriptAnswer.None:
      return identity;

    case TypescriptAnswer.WithTypeChecking:
    case TypescriptAnswer.NoTypeChecking:
      return concatDependencies(typescriptESLintDependencies);
  }
};

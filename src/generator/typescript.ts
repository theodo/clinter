import { TypescriptInfo } from "types";
import { identity } from "utils/utility";
import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { concatConfig, concatDependencies } from "generator/generate";
import {
  tsOverrider,
  typescriptBaseEslintConfig,
  typescriptESLintDependencies,
  typescriptTypeEslintConfig,
} from "generator/base-configs/typescriptEslintConfig";
import { wrapConfigInOverride } from "generator/override";

export const generateTypescriptESLintConfig: ESLintGenerator = (userAnswers) => {
  const baseConfig = wrapConfigInOverride(tsOverrider)(typescriptBaseEslintConfig);
  const typeConfig = wrapConfigInOverride(tsOverrider)(
    concatConfig(typescriptTypeEslintConfig)(typescriptBaseEslintConfig)
  );

  switch (userAnswers.typescript) {
    case TypescriptInfo.None:
      return identity;

    case TypescriptInfo.WithTypeChecking:
      return concatConfig(typeConfig);

    case TypescriptInfo.NoTypeChecking:
      return concatConfig(baseConfig);
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

import { Linter } from "eslint";

import { TypescriptInfo } from "types";
import { identity, pipe } from "utils/utility";
import { ESLintDependencyGenerator, ESLintGenerator } from "generator/types";
import { concatConfig, concatDependencies } from "generator/generate";
import {
  tsOverrider,
  typescriptBaseEslintConfig,
  typescriptESLintDependencies,
  typescriptTypeEslintConfig,
} from "generator/base-configs/typescriptEslintConfig";
import { wrapConfigInOverride } from "generator/override";

const cleanConfigRules = (config: Linter.Config): Linter.Config => {
  const { rules, ...rest } = config;

  if (!rules) {
    return { ...rest };
  }

  const newRules = Object.entries(rules)
    .filter(([key]) => !key.includes("@typescript-eslint"))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return { rules: newRules, ...rest };
};

const cleanConfigExtendsArray = (config: Linter.Config): Linter.Config => {
  const { extends: extendsProperty, ...rest } = config;

  const extendsArray = typeof extendsProperty === "string" ? [extendsProperty] : extendsProperty;

  if (!extendsArray) {
    return { ...rest };
  }

  const newExtendsArray = extendsArray.filter((item) => !item.includes("@typescript-eslint"));

  return { extends: newExtendsArray, ...rest };
};

const cleanConfigWithTSSetup = pipe(cleanConfigRules, cleanConfigExtendsArray);

export const generateTypescriptESLintConfig: ESLintGenerator = (userAnswers) => {
  const baseConfig = wrapConfigInOverride(tsOverrider)(typescriptBaseEslintConfig);
  const typeConfig = wrapConfigInOverride(tsOverrider)(
    concatConfig(typescriptTypeEslintConfig)(typescriptBaseEslintConfig)
  );

  switch (userAnswers.typescript) {
    case TypescriptInfo.None:
      return identity;

    case TypescriptInfo.WithTypeChecking:
      return pipe(concatConfig(typeConfig), cleanConfigWithTSSetup);

    case TypescriptInfo.NoTypeChecking:
      return pipe(concatConfig(baseConfig), cleanConfigWithTSSetup);
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

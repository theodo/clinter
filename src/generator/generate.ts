import {Linter} from "eslint";
import {generateTestESLintConfig, getTestESLintDependencies} from "generator/test-framework";
import {generateTypescriptESLintConfig, getTypescriptESLintDependencies} from "generator/typescript";
import {generateEnvESLintConfig} from "generator/env";
import {generateFrontFrameworkESLintConfig, getFrontFrameworkESLintDependencies} from "generator/front-framework";
import {generatePrettierESlintConfig, getPrettierESLintDependencies} from "generator/prettier";
import {eslintBaseConfig, eslintBaseDependencies} from "generator/base-configs/eslintBaseConfig";
import {ESLintDependencyGenerator, ESLintGenerator} from "generator/types";
import {mergeArrays, pipe, areArraysEqual} from "utils/utility";
import {ProjectInfoObject} from "types";

function addEslintOverride(
  overrides: Linter.ConfigOverride[],
  newOverride: Linter.ConfigOverride
): Linter.ConfigOverride[] {
  if (overrides.length === 0) {
    return [newOverride];
  }

  const [currentOverride, ...rest] = overrides;

  // Configuration overrides are entirely defined by their files property
  const areOverrideFilesEqual = areArraysEqual(
    typeof currentOverride.files === 'string' ? [currentOverride.files] : currentOverride.files,
    typeof newOverride.files === 'string' ? [newOverride.files] : newOverride.files,
  )

  if (currentOverride.parser === newOverride.parser || areOverrideFilesEqual) {
    return [concatConfig(newOverride)(currentOverride), ...rest];
  }

  return [currentOverride, ...addEslintOverride(rest, newOverride)];
}

function concatEslintOverrides(
  prevOverrides: Linter.ConfigOverride[],
  nextOverrides: Linter.ConfigOverride[]
): Linter.ConfigOverride[] {
  return nextOverrides.reduce(addEslintOverride, prevOverrides);
}

function concatESlintObjects<T extends Record<string, unknown>>(prevObject: T, nextObject: T): T {
  return {...prevObject, ...nextObject};
}

function shouldKeepConfigEntry(configEntry: [string, unknown]): boolean {
  const [_, value] = configEntry;

  if (typeof value === "object" && value !== null && Object.keys(value).length === 0) {
    return false;
  }

  return true;
}

function cleanObjectConfig<T>(config: T): T {
  const entries = Object.entries(config);

  const cleanEntries = entries.filter(shouldKeepConfigEntry);

  return Object.fromEntries(cleanEntries) as T;
}

function cleanESLintConfig(config: Linter.Config): Linter.Config {
  const {overrides, ...rest} = cleanObjectConfig(config);

  const cleanOverrides = overrides?.map(cleanObjectConfig);

  if (overrides) {
    return {...rest, overrides: cleanOverrides};
  }

  return {...rest};
}

function concatESlintArrays<T extends Array<string> | string>(prev: T, next: T): Array<string> {
  const prevArray = (typeof prev === "string" ? [prev] : prev) as string[];
  const nextArray = (typeof next === "string" ? [next] : next) as string[];

  return mergeArrays(prevArray, nextArray);
}

export function concatConfig<T extends Linter.Config | Linter.ConfigOverride>(config: T): (prevConfig: T) => T {
  return (prevConfig) => ({
    ...prevConfig,
    ...config,
    extends: concatESlintArrays(prevConfig.extends ?? [], config.extends ?? []),
    rules: concatESlintObjects(prevConfig.rules ?? {}, config.rules ?? {}),
    plugins: concatESlintArrays(prevConfig.plugins ?? [], config.plugins ?? []),
    parserOptions: concatESlintObjects(prevConfig.parserOptions ?? {}, config.parserOptions ?? {}),
    env: concatESlintObjects(prevConfig.env ?? {}, config.env ?? {}),
    overrides: concatEslintOverrides(prevConfig.overrides ?? [], config.overrides ?? []),
  });
}

export function concatDependencies(deps2: string[]): (deps: string[]) => string[] {
  return (deps1) => mergeArrays(deps1, deps2);
}

const generateBaseESLintConfig: ESLintGenerator = (_userAnswers) => {
  return concatConfig(eslintBaseConfig);
};

const getBaseESLintDependencies: ESLintDependencyGenerator = (_userAnswers) =>
  concatDependencies(eslintBaseDependencies);

export function generateEslintConfig(userAnswers: ProjectInfoObject, startConfig: Linter.Config = {}): Linter.Config {
  return pipe(
    generateBaseESLintConfig(userAnswers),
    generateTypescriptESLintConfig(userAnswers),
    generateEnvESLintConfig(userAnswers),
    generateTestESLintConfig(userAnswers),
    generateFrontFrameworkESLintConfig(userAnswers),
    // Prettier must be at the end of the list to avoid potential conflicts
    generatePrettierESlintConfig(userAnswers),
    cleanESLintConfig
  )(startConfig);
}

export function getConfigDependencies(userAnswers: ProjectInfoObject): string[] {
  return pipe(
    getBaseESLintDependencies(userAnswers),
    getTypescriptESLintDependencies(userAnswers),
    getTestESLintDependencies(userAnswers),
    getFrontFrameworkESLintDependencies(userAnswers),
    getPrettierESLintDependencies(userAnswers)
  )([]);
}

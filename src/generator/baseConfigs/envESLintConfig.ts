import { Linter } from "eslint";

export const browserESLintEnvConfig: Linter.Config = {
  env: {
    browser: true,
    es6: true,
  },
};

export const nodeESLintEnvConfig: Linter.Config = {
  env: {
    node: true,
    es6: true,
  },
};

export const jestESLintEnvConfig: Linter.Config = {
  env: {
    jest: true,
  },
};

export const jestESLintDependencies = ["eslint-plugin-jest"]
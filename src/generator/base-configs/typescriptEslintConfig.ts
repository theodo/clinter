import { Linter } from "eslint";

export const typescriptBaseEslintConfig: Linter.Config = {
  extends: ["plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  rules: {
    "@typescript-eslint/prefer-optional-chain": "error",
  },
};

export const typescriptTypeEslintConfig: Linter.Config = {
  extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
  rules: {
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
  },
};

export const typescriptESLintDependencies = ["@typescript-eslint/parser", "@typescript-eslint/eslint-plugin"];

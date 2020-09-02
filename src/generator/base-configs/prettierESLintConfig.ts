import { Linter } from "eslint";

export const prettierESLintConfig: Linter.Config = {
  extends: ["plugin:prettier/recommended"],
};

export const prettierTypescriptESLintConfig: Linter.Config = {
  extends: ["prettier/@typescript-eslint"],
};

export const prettierReactESLintConfig: Linter.Config = {
  extends: ["prettier/react"],
};

export const prettierVueESLintConfig: Linter.Config = {
  extends: ["prettier/vue"],
};

export const prettierESLintDependencies = ["prettier", "eslint-config-prettier", "eslint-plugin-prettier"];
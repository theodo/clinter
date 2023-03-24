import { Linter } from "eslint";

export const prettierESLintConfig: Linter.Config = {
  extends: ["plugin:prettier/recommended"],
};

export const prettierESLintDependencies = ["prettier", "eslint-config-prettier", "eslint-plugin-prettier"];

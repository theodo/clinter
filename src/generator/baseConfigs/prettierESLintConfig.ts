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

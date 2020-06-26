import { Linter } from "eslint";

export const typescriptTypeEslintConfig: Linter.Config = {
  extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
  rules: {
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
  },
};

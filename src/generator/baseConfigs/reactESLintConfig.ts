import { Linter } from "eslint";

export const reactESLintConfig: Linter.Config = {
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["plugin:react/recommended"],
  plugins: ["react-hooks"],
  rules: {
    "react/no-string-refs": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};

export const reactTypescriptESLintConfig: Linter.Config = {
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};

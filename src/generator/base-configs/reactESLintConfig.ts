import { Linter } from "eslint";

export const reactESLintConfig: Linter.Config = {
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["react-app"],
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

export const reactESLintDependencies = ["eslint-plugin-react-app", "eslint-config-react-app"];

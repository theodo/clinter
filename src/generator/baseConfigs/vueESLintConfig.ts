import { Linter } from "eslint";

export const vueESLintConfig: Linter.Config = {
  extends: ["plugin:vue/essential"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};

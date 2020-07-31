import { Linter } from "eslint";

export const eslintBaseConfig: Linter.Config = {
  root: true,
  env: {},
  parserOptions: {},
  extends: ["eslint:recommended"],
  plugins: ["import"],
  rules: {
    curly: ["error", "all"],
    eqeqeq: ["error", "smart"],
    complexity: ["error", 8],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
    "no-shadow": [
      "error",
      {
        hoist: "all",
      },
    ],
    "prefer-const": "error",
    "import/order": [
      "error",
      {
        groups: [["external", "builtin"], "internal", ["parent", "sibling", "index"]],
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
  },
};

export const eslintBaseDependencies = ["eslint", "eslint-plugin-import"];

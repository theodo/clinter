import { Linter } from "eslint";

export const eslintBaseConfig: Linter.Config = {
  root: true,
  extends: ["eslint:recommended"],
  plugins: ["import"],
  rules: {
    curly: ["error", "all"],
    eqeqeq: ["error", "smart"],
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
    "padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: "return" }],
  },
};

export const eslintBaseDependencies = ["eslint", "eslint-plugin-import"];

import { Linter } from "eslint";
import { ESLintOverrider } from "generator/types";

export const typescriptBaseEslintConfig: Linter.Config = {
  extends: ["plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  rules: {
    // Prefer using concise optional chain expressions instead of chained logical ands
    "@typescript-eslint/prefer-optional-chain": "error",
    // Disable JS no-shadow rule
    "no-shadow": "off",
    // Disallow variable declarations from shadowing variables declared in the outer scope
    "@typescript-eslint/no-shadow": "error",
  },
};

export const typescriptTypeEslintConfig: Linter.Config = {
  extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
  rules: {
    // Enforce the usage of the nullish coalescing operator instead of logical chaining
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    // Restricts the types allowed in boolean expressions
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: true,
      },
    ],
    // Flags unnecessary equality comparisons against boolean literals
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    // Prevents conditionals where the type is always truthy or always falsy
    "@typescript-eslint/no-unnecessary-condition": "error",
    // Enforces that type arguments will not be used if not required
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    // Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    // Exhaustiveness checking in switch with union type
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    // Prevents the text 'undefined' to appear in a template string
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
        allowBoolean: true,
      },
    ],
  },
};

export const tsOverrider: ESLintOverrider = {
  files: ["**/*.ts?(x)"],
};

export const typescriptESLintDependencies = ["@typescript-eslint/parser", "@typescript-eslint/eslint-plugin"];

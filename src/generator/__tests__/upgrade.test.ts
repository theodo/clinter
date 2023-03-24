import { generateEslintConfig } from "generator/generate";
import { FormatterInfo, FrontFrameworkInfo, TestFrameworkInfo, TypescriptInfo } from "types";
import { eslintBaseConfig } from "generator/base-configs";
import { Linter } from "eslint";

describe("generateEslintConfig", () => {
  describe("Upgrade Mode", () => {
    describe("Simple eslint config", () => {
      it("should return the base eslint config when no start config is given", () => {
        expect(
          generateEslintConfig(
            {
              typescript: TypescriptInfo.None,
              env: [],
              formatter: FormatterInfo.None,
              frontFramework: FrontFrameworkInfo.None,
              test: TestFrameworkInfo.None,
            },
            {}
          )
        ).toStrictEqual(eslintBaseConfig);
      });

      it("should return a ESLint config with empty fields removed", () => {
        expect(
          generateEslintConfig(
            {
              typescript: TypescriptInfo.None,
              env: [],
              formatter: FormatterInfo.None,
              frontFramework: FrontFrameworkInfo.None,
              test: TestFrameworkInfo.None,
            },
            {
              env: {},
            }
          )
        ).toStrictEqual(eslintBaseConfig);
      });

      it("should return a ESLint config without changing the order of the original config fields", () => {
        const customESLintConfig: Linter.Config = {
          env: {
            node: true,
            browser: true,
          },
          extends: ["CUSTOM-ESLINT-CONFIG"],
          root: true,
          rules: {
            "custom-rule-name": "error",
          },
        };
        expect(
          generateEslintConfig(
            {
              typescript: TypescriptInfo.None,
              env: [],
              formatter: FormatterInfo.None,
              frontFramework: FrontFrameworkInfo.None,
              test: TestFrameworkInfo.None,
            },
            customESLintConfig
          )
        ).toMatchSnapshot();
      });
    });
  });
});

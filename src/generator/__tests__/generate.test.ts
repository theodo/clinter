import { generateEslintConfig } from "generator/generate";
import { FormatterInfo, FrontFrameworkInfo, TestFrameworkInfo, TypescriptInfo } from "types";
import { eslintBaseConfig } from "generator/base-configs";

describe("generateEslintConfig", () => {
  describe("Generator Mode", () => {
    describe("Simple eslint config", () => {
      it("should return a simple eslint configuration when no special answers are provided", () => {
        expect(
          generateEslintConfig({
            typescript: TypescriptInfo.None,
            env: [],
            formatter: FormatterInfo.None,
            frontFramework: FrontFrameworkInfo.None,
            test: TestFrameworkInfo.None,
          })
        ).toStrictEqual(eslintBaseConfig);
      });
    });

    describe("TypeScript", () => {
      it("should return a TS configuration with type checking", () => {
        const config = generateEslintConfig({
          typescript: TypescriptInfo.WithTypeChecking,
          env: [],
          formatter: FormatterInfo.None,
          frontFramework: FrontFrameworkInfo.None,
          test: TestFrameworkInfo.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.overrides?.[0].extends).toContain("plugin:@typescript-eslint/recommended");
        expect(config.overrides?.[0].extends).toContain(
          "plugin:@typescript-eslint/recommended-requiring-type-checking"
        );
      });

      it("should return a TS configuration without type checking", () => {
        const config = generateEslintConfig({
          typescript: TypescriptInfo.NoTypeChecking,
          env: [],
          formatter: FormatterInfo.None,
          frontFramework: FrontFrameworkInfo.None,
          test: TestFrameworkInfo.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.overrides?.[0].extends).toContain("plugin:@typescript-eslint/recommended");
      });
    });

    describe("React", () => {
      it("should return a react configuration", () => {
        const config = generateEslintConfig({
          typescript: TypescriptInfo.None,
          env: [],
          formatter: FormatterInfo.None,
          frontFramework: FrontFrameworkInfo.React,
          test: TestFrameworkInfo.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends).toContain("react-app");
      });
    });

    describe("React", () => {
      it("should return a Vue configuration", () => {
        const config = generateEslintConfig({
          typescript: TypescriptInfo.None,
          env: [],
          formatter: FormatterInfo.None,
          frontFramework: FrontFrameworkInfo.Vue,
          test: TestFrameworkInfo.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends).toContain("plugin:vue/essential");
      });
    });
  });
});

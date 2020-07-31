import { generateEslintConfig } from "generator/generate";
import { FormatterAnswer, FrontFrameworkAnswer, TestFrameworkAnswer, TypescriptAnswer } from "types";
import { eslintBaseConfig } from "generator/baseConfigs";

describe("generateEslintConfig", () => {
  describe("Generator Mode", () => {
    describe("Simple eslint config", () => {
      it("should return a simple eslint configuration when no special answers are provided", () => {
        expect(
          generateEslintConfig({
            typescript: TypescriptAnswer.None,
            env: [],
            formatter: FormatterAnswer.None,
            frontFramework: FrontFrameworkAnswer.None,
            test: TestFrameworkAnswer.None,
          })
        ).toStrictEqual(eslintBaseConfig);
      });
    });

    describe("TypeScript", () => {
      it("should return a TS configuration with type checking", () => {
        const config = generateEslintConfig({
          typescript: TypescriptAnswer.WithTypeChecking,
          env: [],
          formatter: FormatterAnswer.None,
          frontFramework: FrontFrameworkAnswer.None,
          test: TestFrameworkAnswer.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends).toContain("plugin:@typescript-eslint/recommended");
        expect(config.extends).toContain("plugin:@typescript-eslint/recommended-requiring-type-checking");
      });

      it("should return a TS configuration without type checking", () => {
        const config = generateEslintConfig({
          typescript: TypescriptAnswer.NoTypeChecking,
          env: [],
          formatter: FormatterAnswer.None,
          frontFramework: FrontFrameworkAnswer.None,
          test: TestFrameworkAnswer.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends).toContain("plugin:@typescript-eslint/recommended");
      });

      it("should return a TS configuration with prettier formatter", () => {
        const config = generateEslintConfig({
          typescript: TypescriptAnswer.WithTypeChecking,
          env: [],
          formatter: FormatterAnswer.Prettier,
          frontFramework: FrontFrameworkAnswer.None,
          test: TestFrameworkAnswer.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends?.[config.extends?.length - 1]).toBe("prettier/@typescript-eslint");
      });
    });

    describe("React", () => {
      it("should return a react configuration", () => {
        const config = generateEslintConfig({
          typescript: TypescriptAnswer.None,
          env: [],
          formatter: FormatterAnswer.None,
          frontFramework: FrontFrameworkAnswer.React,
          test: TestFrameworkAnswer.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends).toContain("react-app");
      });

      it("should return a react configuration with prettier formatter", () => {
        const config = generateEslintConfig({
          typescript: TypescriptAnswer.None,
          env: [],
          formatter: FormatterAnswer.Prettier,
          frontFramework: FrontFrameworkAnswer.React,
          test: TestFrameworkAnswer.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends?.[config.extends?.length - 1]).toBe("prettier/react");
      });
    });

    describe("React", () => {
      it("should return a Vue configuration", () => {
        const config = generateEslintConfig({
          typescript: TypescriptAnswer.None,
          env: [],
          formatter: FormatterAnswer.None,
          frontFramework: FrontFrameworkAnswer.Vue,
          test: TestFrameworkAnswer.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends).toContain("plugin:vue/essential");
      });

      it("should return a Vue configuration with prettier formatter", () => {
        const config = generateEslintConfig({
          typescript: TypescriptAnswer.None,
          env: [],
          formatter: FormatterAnswer.Prettier,
          frontFramework: FrontFrameworkAnswer.Vue,
          test: TestFrameworkAnswer.None,
        });

        expect(config).toMatchSnapshot();
        expect(config.extends?.[config.extends?.length - 1]).toBe("prettier/vue");
      });
    });
  });
});

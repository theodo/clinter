import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { InputConfig } from "parser/inputConfig/types";
import { FormatterAnswer, FrontFrameworkAnswer, TypescriptAnswer } from "types";

describe("Prettier eslint configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a prettier eslint configuration", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        formatter: FormatterAnswer.Prettier,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-config");
  });

  it("should return a prettier typescript eslint configuration with type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptAnswer.WithTypeChecking,
        formatter: FormatterAnswer.Prettier,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-ts-config");
  });

  it("should return a prettier react eslint configuration with type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        formatter: FormatterAnswer.Prettier,
        frontFramework: FrontFrameworkAnswer.React,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-react-config");
  });

  it("should return a prettier react typescript eslint configuration with type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptAnswer.WithTypeChecking,
        formatter: FormatterAnswer.Prettier,
        frontFramework: FrontFrameworkAnswer.React,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-ts-react-config");
  });

  it("should return a prettier vue eslint configuration with type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        formatter: FormatterAnswer.Prettier,
        frontFramework: FrontFrameworkAnswer.Vue,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-vue-config");
  });

  it("should return a prettier vue typescript eslint configuration with type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptAnswer.WithTypeChecking,
        formatter: FormatterAnswer.Prettier,
        frontFramework: FrontFrameworkAnswer.Vue,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-ts-vue-config");
  });
});

import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { ClinterSettings, FormatterInfo, FrontFrameworkInfo, TypescriptInfo } from "types";

describe("Prettier eslint configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a prettier eslint configuration", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        formatter: FormatterInfo.Prettier,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-config");
  });

  it("should return a prettier typescript eslint configuration with type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.WithTypeChecking,
        formatter: FormatterInfo.Prettier,
      },
    };

    const tsConfig = {
      compilerOptions: {
        strict: true,
      },
    };

    testService.loadInputConfig(inputConfig);
    testService.loadInitialTSConfig(tsConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-ts-config");
  });

  it("should return a prettier react eslint configuration with type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        formatter: FormatterInfo.Prettier,
        frontFramework: FrontFrameworkInfo.React,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-react-config");
  });

  it("should return a prettier react typescript eslint configuration with type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.WithTypeChecking,
        formatter: FormatterInfo.Prettier,
        frontFramework: FrontFrameworkInfo.React,
      },
    };

    const tsConfig = {
      compilerOptions: {
        strict: true,
      },
    };

    testService.loadInputConfig(inputConfig);
    testService.loadInitialTSConfig(tsConfig);

    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-ts-react-config");
  });

  it("should return a prettier vue eslint configuration with type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        formatter: FormatterInfo.Prettier,
        frontFramework: FrontFrameworkInfo.Vue,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-vue-config");
  });

  it("should return a prettier vue typescript eslint configuration with type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.WithTypeChecking,
        formatter: FormatterInfo.Prettier,
        frontFramework: FrontFrameworkInfo.Vue,
      },
    };

    const tsConfig = {
      compilerOptions: {
        strict: true,
      },
    };

    testService.loadInputConfig(inputConfig);
    testService.loadInitialTSConfig(tsConfig);

    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-prettier-ts-vue-config");
  });
});

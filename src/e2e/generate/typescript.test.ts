import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { ClinterSettings, TypescriptInfo } from "types";

describe("TypeScript configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a typescript eslint configuration with no type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.NoTypeChecking,
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

    expect(outputConfig).toMatchSnapshot("eslint-ts-no-type-checking-config");
  });

  it("should return a typescript eslint configuration with type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.WithTypeChecking,
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

    expect(outputConfig).toMatchSnapshot("eslint-ts-type-checking-config");
  });
});

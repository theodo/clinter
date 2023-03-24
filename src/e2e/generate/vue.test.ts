import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { ClinterSettings, FrontFrameworkInfo, TypescriptInfo } from "types";

describe("Vue configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a vue eslint configuration", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        frontFramework: FrontFrameworkInfo.Vue,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-vue-config");
  });

  it("should return a vue typescript eslint configuration with type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.WithTypeChecking,
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

    expect(outputConfig).toMatchSnapshot("eslint-vue-ts-config");
  });
});

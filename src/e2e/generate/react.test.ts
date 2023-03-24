import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { ClinterSettings, FrontFrameworkInfo, TypescriptInfo } from "types";

describe("React configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a react eslint configuration", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        frontFramework: FrontFrameworkInfo.React,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-react-config");
  });

  it("should return a react typescript eslint configuration with type checking", async () => {
    const inputConfig: ClinterSettings = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.WithTypeChecking,
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

    expect(outputConfig).toMatchSnapshot("eslint-react-ts-config");
  });
});

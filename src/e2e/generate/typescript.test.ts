import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { InputConfig } from "parser/inputConfig/types";
import { TypescriptInfo } from "types";

describe("TypeScript configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a typescript eslint configuration with no type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.NoTypeChecking,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-ts-no-type-checking-config");
  });

  it("should return a typescript eslint configuration with type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.WithTypeChecking,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-ts-type-checking-config");
  });
});

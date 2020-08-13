import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { InputConfig } from "parser/inputConfig/types";
import { FrontFrameworkAnswer, TypescriptAnswer } from "types";

describe("Vue configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a vue eslint configuration", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        frontFramework: FrontFrameworkAnswer.Vue,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-vue-config");
  });

  it("should return a vue typescript eslint configuration with type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptAnswer.WithTypeChecking,
        frontFramework: FrontFrameworkAnswer.Vue,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-vue-ts-config");
  });
});

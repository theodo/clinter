import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { InputConfig } from "parser/inputConfig/types";
import { FrontFrameworkAnswer, TypescriptAnswer } from "types";

describe("React configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a react eslint configuration", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        frontFramework: FrontFrameworkAnswer.React,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-react-config");
  });

  it("should return a react typescript eslint configuration with type checking", async () => {
    const inputConfig: InputConfig = {
      ...defaultInputConfig,
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptAnswer.WithTypeChecking,
        frontFramework: FrontFrameworkAnswer.React,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-react-ts-config");
  });
});

import { makeTestService } from "e2e/helpers";
import { InputConfig } from "parser/inputConfig/types";
import { FormatterAnswer, FrontFrameworkAnswer, ModeAnswer, TestFrameworkAnswer, TypescriptAnswer } from "types";

describe("ESLint configuration", () => {
  const testService = makeTestService();

  it("should return the right eslint configuration for the right input", async () => {
    const inputConfig: InputConfig = {
      modeConfig: {
        mode: ModeAnswer.Generator,
      },
      generatorConfig: {
        typescript: TypescriptAnswer.None,
        env: [],
        formatter: FormatterAnswer.Prettier,
        frontFramework: FrontFrameworkAnswer.None,
        test: TestFrameworkAnswer.Jest,
      },
    };

    testService.loadInputConfig(inputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint");
  });
});

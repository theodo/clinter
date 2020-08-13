import { defaultInputConfig, makeTestService } from "e2e/helpers";

describe("ESLint Base Configuration Generator Mode", () => {
  it("should return a standard eslint configuration with no extensions", async () => {
    const testService = makeTestService();

    testService.loadInputConfig(defaultInputConfig);
    await testService.runClinter();
    const outputConfig = testService.getParsedOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-simple-config");
  });
});

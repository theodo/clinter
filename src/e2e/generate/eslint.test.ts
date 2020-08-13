import { defaultInputConfig, makeTestService } from "e2e/helpers";

describe("ESLint Base Configuration Generator Mode", () => {
  const testService = makeTestService();

  it("should return a standard eslint configuration with no extensions", async () => {
    testService.loadInputConfig(defaultInputConfig);
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot("eslint-simple-config");
  });
});

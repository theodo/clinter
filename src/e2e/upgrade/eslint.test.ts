import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { ClinterModeInfo } from "types";

describe("ESLint Base Configuration Upgrade Mode", () => {
  it.each`
    filename            | initialConfig
    ${".eslintrc"}      | ${"{}"}
    ${".eslintrc.json"} | ${"{}"}
    ${".eslintrc.js"}   | ${"module.exports = {}"}
  `(
    "should return a standard eslint configuration with no extensions appended to an empty config in $filename",
    async ({ filename, initialConfig }: { filename: string; initialConfig: string }) => {
      const testService = makeTestService(filename);

      testService.loadInputConfig({ ...defaultInputConfig, modeConfig: { mode: ClinterModeInfo.Upgrade } });
      testService.loadInitialLinterConfig(initialConfig);
      testService.loadInitialLinterConfig;
      await testService.runClinter();
      const outputConfig = testService.getOutputConfig();

      expect(outputConfig).toMatchSnapshot(`eslint-simple-config-${filename}`);
    }
  );
});

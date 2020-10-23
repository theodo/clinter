import { Linter } from "eslint";

import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { ClinterModeInfo, TypescriptInfo } from "types";

describe("ESLint Base Configuration Upgrade Mode", () => {
  it("should return a typescript eslint configuration with an override and no typescript-eslint in base rules", async () => {
    const testService = makeTestService();

    const initialConfig: Linter.Config = {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/strict-boolean-expressions": "error",
      },
    };

    testService.loadInputConfig({
      ...defaultInputConfig,
      modeConfig: { mode: ClinterModeInfo.Upgrade },
      generatorConfig: { ...defaultInputConfig.generatorConfig, typescript: TypescriptInfo.WithTypeChecking },
    });
    testService.loadInitialLinterConfig(JSON.stringify(initialConfig));
    testService.loadInitialLinterConfig;
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot(`eslint-typescript-upgrade`);
  });

  it("should return a typescript eslint configuration with no type checking with an override and no typescript-eslint in base rules", async () => {
    const testService = makeTestService();

    const initialConfig: Linter.Config = {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/prefer-optional-chain": "error",
      },
    };

    testService.loadInputConfig({
      ...defaultInputConfig,
      modeConfig: { mode: ClinterModeInfo.Upgrade },
      generatorConfig: { ...defaultInputConfig.generatorConfig, typescript: TypescriptInfo.NoTypeChecking },
    });
    testService.loadInitialLinterConfig(JSON.stringify(initialConfig));
    testService.loadInitialLinterConfig;
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot(`eslint-typescript-upgrade-no-type-checking`);
  });
});

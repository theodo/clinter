import { Linter } from "eslint";

import { defaultInputConfig, makeTestService } from "e2e/helpers";
import { ClinterModeInfo, FormatterInfo, FrontFrameworkInfo, TypescriptInfo } from "types";

describe("ESLint Prettier Base Configuration Upgrade Mode", () => {
  it("should return a typescript eslint configuration with a cleaned prettier config without prettier/@typescript-eslint", async () => {
    const testService = makeTestService();

    const initialConfig: Linter.Config = {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
      ],
      rules: {
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/strict-boolean-expressions": "error",
      },
    };

    const tsConfig = {
      compilerOptions: {
        strict: true,
      },
    };

    testService.loadInputConfig({
      ...defaultInputConfig,
      modeConfig: { mode: ClinterModeInfo.Upgrade },
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        typescript: TypescriptInfo.WithTypeChecking,
        formatter: FormatterInfo.Prettier,
      },
    });
    testService.loadInitialLinterConfig(JSON.stringify(initialConfig));

    testService.loadInitialTSConfig(tsConfig);

    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot(`eslint-prettier-typescript-upgrade`);
  });

  it("should return a react eslint configuration with no type checking with a TSConfig without strict null checks", async () => {
    const testService = makeTestService();

    const initialConfig: Linter.Config = {
      extends: ["plugin:prettier/recommended", "prettier/@typescript-eslint"],
      rules: {
        "@typescript-eslint/prefer-optional-chain": "error",
      },
    };

    testService.loadInputConfig({
      ...defaultInputConfig,
      modeConfig: { mode: ClinterModeInfo.Upgrade },
      generatorConfig: {
        ...defaultInputConfig.generatorConfig,
        frontFramework: FrontFrameworkInfo.React,
        formatter: FormatterInfo.Prettier,
      },
    });
    testService.loadInitialLinterConfig(JSON.stringify(initialConfig));
    await testService.runClinter();
    const outputConfig = testService.getOutputConfig();

    expect(outputConfig).toMatchSnapshot(`eslint-prettier-react-upgrade`);
  });
});

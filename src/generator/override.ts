import { Linter } from "eslint";
import { ESLintOverrider } from "generator/types";

/**
 * Transform a config into an override config
 * @param overrider the eslint attributes to be added to transform the config to an override config
 */
export function wrapConfigInOverride(overrider: ESLintOverrider): (config: Linter.Config) => Linter.Config {
  return (config) => ({
    overrides: [
      {
        ...overrider,
        ...config,
      },
    ],
  });
}

import { ESLintGenerator } from "generator/types";
import { identity, pipe } from "utils/utility";
import { browserESLintEnvConfig, nodeESLintEnvConfig } from "generator/baseConfigs";
import { concatConfig } from "generator/generate";
import { EnvInfo } from "types";

const generateBrowserEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return userAnswers.env.includes(EnvInfo.Browser) ? concatConfig(browserESLintEnvConfig) : identity;
};

const generateNodeEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return userAnswers.env.includes(EnvInfo.Node) ? concatConfig(nodeESLintEnvConfig) : identity;
};

export const generateEnvESLintConfig: ESLintGenerator = (userAnswers) => {
  return pipe(generateBrowserEnvESLintConfig(userAnswers), generateNodeEnvESLintConfig(userAnswers));
};

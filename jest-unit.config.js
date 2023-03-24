module.exports = {
  name: "unit",
  displayName: "Unit Tests",
  roots: ["<rootDir>/src"],
  modulePathIgnorePatterns: ["<rootDir>/src/e2e/"],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^generator/(.*)$": "<rootDir>/src/generator/$1",
    "^e2e/(.*)$": "<rootDir>/src/e2e/$1",
    "^dependencies/(.*)$": "<rootDir>/src/dependencies/$1",
    "^writer/(.*)$": "<rootDir>/src/writer/$1",
    "^parser/(.*)$": "<rootDir>/src/parser/$1",
    "^logger/(.*)$": "<rootDir>/src/logger/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^types": "<rootDir>/src/types.ts",
  },
};

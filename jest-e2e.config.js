module.exports = {
  name: "e2e",
  displayName: "E2E Tests",
  roots: ["<rootDir>/src/e2e/"],
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest-e2e.setup.js"],
  moduleNameMapper: {
    "^generator/(.*)$": "<rootDir>/src/generator/$1",
    "^e2e/(.*)$": "<rootDir>/src/e2e/$1",
    "^dependencies/(.*)$": "<rootDir>/src/dependencies/$1",
    "^fileWriter/(.*)$": "<rootDir>/src/fileWriter/$1",
    "^parser/(.*)$": "<rootDir>/src/parser/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^types": "<rootDir>/src/types.ts",
  },
};

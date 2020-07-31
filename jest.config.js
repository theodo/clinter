module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^generator/(.*)$": "<rootDir>/src/generator/$1",
    "^dependencies/(.*)$": "<rootDir>/src/dependencies/$1",
    "^fileWriter/(.*)$": "<rootDir>/src/fileWriter/$1",
    "^parser/(.*)$": "<rootDir>/src/parser/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^types": "<rootDir>/src/types.ts",
  },
};

import { Linter } from "eslint";
import { readFileSync, writeFileSync } from "fs";
import { worker } from "workerpool";

const groupErrorsByLine = (errors: Linter.LintMessage[]): Record<number, Linter.LintMessage[]> => {
  return errors.reduce((result: Record<number, Linter.LintMessage[]>, error) => {
    const lineNumber = error.line;
    if (result[lineNumber] === undefined) {
      result[lineNumber] = [];
    }

    result[lineNumber].push(error);

    return result;
  }, {});
};

const insertErrorIgnoreLines = (sourceLines: string[], errorsByLine: Record<number, Linter.LintMessage[]>): string[] =>
  (Object.entries(errorsByLine) as unknown as [number, Linter.LintMessage[]][])
    .sort(([lineA], [lineB]) => lineB - lineA)
    .reduce((source, [lineNumber, errors]) => {
      const mappedErrors = errors
        .filter((error) => error.severity === 2 && error.fix === undefined)
        .map((error) => error.ruleId);

      if (mappedErrors.length === 0) {
        return source;
      }

      const errorRulesString = mappedErrors.join(", ");

      const ignoreString = `// eslint-disable-next-line ${errorRulesString}`;

      const indentation = /^\s*/.exec(source[lineNumber - 1])?.[0] ?? "";

      source.splice(lineNumber - 1, 0, indentation + ignoreString);

      return source;
    }, sourceLines);

const insertIgnoreLinesInFile = (filePath: string, fileErrors: Linter.LintMessage[]) => {
  const fileSource = readFileSync(filePath).toString().split("\n");

  const errorsByLine = groupErrorsByLine(fileErrors);

  const newSource = insertErrorIgnoreLines(fileSource, errorsByLine).join("\n");

  writeFileSync(filePath, newSource);
};

// create a worker and register public functions
worker({
  insertIgnoreLinesInFile,
});

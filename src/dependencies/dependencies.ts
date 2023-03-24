import { getPackageTool, PackageTool } from "parser/package-tool";
import { exec } from "child-process-promise";

function formatDependencies(dependencies: string[]): string {
  return dependencies.reduce((dependencyString, dependency) => `${dependencyString} ${dependency}@latest`, "");
}

function installDependenciesYarn(dependencies: string[], dirpath: string): Promise<void> {
  return exec(`yarn add --cwd ${dirpath} ${formatDependencies(dependencies)} -D -W`).then(() => Promise.resolve());
}

function installDependenciesYarnBerry(dependencies: string[], dirpath: string): Promise<void> {
  return exec(`yarn add --cwd ${dirpath} ${formatDependencies(dependencies)} -D`).then(() => Promise.resolve());
}

function installDependenciesNpm(dependencies: string[], dirpath: string): Promise<void> {
  return exec(`npm install --prefix ${dirpath} ${formatDependencies(dependencies)} --save-dev`).then(() =>
    Promise.resolve()
  );
}

function installDependenciesPnpm(dependencies: string[], dirpath: string): Promise<void> {
  return exec(`pnpm add -Dw --dir ${dirpath} ${formatDependencies(dependencies)}`).then(() => Promise.resolve());
}

export function installDevDependencies(dependencies: string[], dirPath: string): Promise<void> {
  switch (getPackageTool(dirPath)) {
    case PackageTool.NPM:
      return installDependenciesNpm(dependencies, dirPath);

    case PackageTool.YARN:
      return installDependenciesYarn(dependencies, dirPath);

    case PackageTool.YARN_BERRY:
      return installDependenciesYarnBerry(dependencies, dirPath);

    case PackageTool.PNPM:
      return installDependenciesPnpm(dependencies, dirPath);
  }
}

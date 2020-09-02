import path from "path";

import { ConfigContainer, FileExtension } from "parser/linter-config-parser/types";

export function createDefaultConfigContainer<T>(dirPath: string, config: T): ConfigContainer<T> {
  return {
    config,
    file: {
      extension: FileExtension.NONE,
      name: path.join(dirPath, ".eslintrc.json"),
    },
  };
}

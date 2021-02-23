import { getStrictNullChecksOption } from "../typescript-config";

describe("TSConfig parser", () => {
  it("should return true if strict is true and no strictNullChecks present", () => {
    const tsconfig = {
      config: {
        compilerOptions: {
          strict: true,
        },
      },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(true);
  });

  it("should return true if strict is false and strictNullChecks is true", () => {
    const tsconfig = {
      config: {
        compilerOptions: {
          strict: false,
          strictNullChecks: true,
        },
      },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(true);
  });

  it("should return true if strict is true and strictNullChecks is true", () => {
    const tsconfig = {
      config: {
        compilerOptions: {
          strict: true,
          strictNullChecks: true,
        },
      },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(true);
  });

  it("should return false by default", () => {
    const tsconfig = {
      config: { compilerOptions: {} },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(false);
  });

  it("should return false if strict is false", () => {
    const tsconfig = {
      config: {
        compilerOptions: {
          strict: false,
        },
      },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(false);
  });
});

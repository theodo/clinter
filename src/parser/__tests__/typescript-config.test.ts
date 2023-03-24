import { getStrictNullChecksOption } from "../typescript-config";

describe("TSConfig parser", () => {
  it("should return true if strict is true and no strictNullChecks present", () => {
    const tsconfig = {
      compilerOptions: {
        strict: true,
      },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(true);
  });

  it("should return true if strict is false and strictNullChecks is true", () => {
    const tsconfig = {
      compilerOptions: {
        strict: false,
        strictNullChecks: true,
      },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(true);
  });

  it("should return true if strict is true and strictNullChecks is true", () => {
    const tsconfig = {
      compilerOptions: {
        strict: true,
        strictNullChecks: true,
      },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(true);
  });

  it("should return false by default", () => {
    const tsconfig = {
      compilerOptions: {},
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(false);
  });

  it("should return false if strict is false", () => {
    const tsconfig = {
      compilerOptions: {
        strict: false,
      },
    };

    expect(getStrictNullChecksOption(tsconfig)).toBe(false);
  });
});

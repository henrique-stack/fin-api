export default {
  bail: true,
  preset: "ts-jest",
  verbose: true,
  testMatch: ["**.spec.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  clearMocks: true,
  testEnvironment: "node",
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

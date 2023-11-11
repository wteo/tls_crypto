// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "mocha",
  testRunner_comment:
    "Take a look at (missing 'homepage' URL in package.json) for information about the mocha plugin.",
  coverageAnalysis: "perTest",
  mutate: [
    "controllers/**/*.js",
    "middlewares/*.js"
  ],
  mochaOptions: {
    spec: ["test/*.test.js"]
  },
};
export default config;

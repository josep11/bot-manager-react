module.exports = {
  transform: {
    "^.+\\.ts?$": ["ts-jest", {
      tsconfig: './tsconfig.json'
    }]
  },
  testEnvironment: "node",
  // reporters: [
  //   "default",
  //   [
  //     "jest-junit",
  //     {
  //       "outputDirectory": "./test-results/junit",
  //       "outputName": "results.xml"
  //     }
  //   ]
  // ],
  runner: "groups",
  testRegex: "/src/.*\\.(test|spec)?\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testTimeout: 30 * 1000,
};

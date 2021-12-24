module.exports = {
  parser: "@typescript-eslint/parser",
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    semi: [2, "never"],
    indent: [2, 2],
    strict: 0,
    "no-console": 0,
  },
};

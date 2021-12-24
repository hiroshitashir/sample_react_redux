module.exports = {
  env: {
    browser: false,
  },
  extends: ["../.eslintrc.js"],
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
}

module.exports = {
  env: {
    browser: true,
  },
  extends: ["../.eslintrc.js"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "react/prop-types": [0],
    indent: [0],
  },
}

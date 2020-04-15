module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        "plugin:react/recommended",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint",
        "plugin:jsx-a11y/recommended",
        "plugin:redux-saga/recommended"
    ],
    plugins: [
        "react",
        "react-hooks",
        "redux-saga",
        "prettier",
        "jsx-a11y",
        "@typescript-eslint"
    ],
    rules: {
        "prettier/prettier": "error",
        "react/prop-types": "off",
        "react/no-danger": "error",
        "no-console": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-props-no-spreading": "off"
    },
    settings: {
        'import/resolver': {
          node: {
            paths: ['src']
          }
        }
      }
}

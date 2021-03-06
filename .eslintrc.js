module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./cypress/tsconfig.json', './tsconfig.json']
    },
    env: {
        jest: true,
        browser: true,
        es6: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:jsx-a11y/recommended',
        'plugin:redux-saga/recommended'
    ],
    plugins: [
        'react',
        'react-hooks',
        'redux-saga',
        'prettier',
        'jsx-a11y',
        '@typescript-eslint'
    ],
    rules: {
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        'react/no-danger': 'error',
        'no-console': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/ban-ts-ignore': 'warn',
        '@typescript-eslint/unbound-method': 'warn',
        'spaced-comment': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false
            }
        ]
    }
}

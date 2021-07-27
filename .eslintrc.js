module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-inline-html': "off",
    },
};

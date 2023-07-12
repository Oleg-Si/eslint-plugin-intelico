# eslint-plugin-intelico

Linting rules for ESLint from Intelico

### Installation

Install with NPM.

Run `npm install eslint-plugin-intelico -D` to install the library.

### Usage

Open eslint config file

```js
{
    plugins: ['intelico'],
    rules: {
        'intelico/not-is-props-notation': 'warn',
        'intelico/not-has-props-notation': 'warn',
    }
}
```

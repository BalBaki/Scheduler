/** @type {import("prettier").Config} */
module.exports = {
    plugins: [
        'prettier-plugin-tailwindcss',
        '@ianvs/prettier-plugin-sort-imports',
    ],
    tabWidth: 4,
    singleQuote: true,
    importOrder: [
        '.css$',
        '^react$',
        '^next/(.*)$',
        '<BUILTIN_MODULES>',
        '<THIRD_PARTY_MODULES>',
        '^./(.*)$',
        '^../(.*)$',
        '^@/(.*)$',
        '^@radix(.*)$',
        '<TYPES>',
        '<TYPES>^(@)',
        '<TYPES>^[.]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};

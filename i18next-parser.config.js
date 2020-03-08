module.exports = {
  createOldCatalogs: true,
  indentation: 2,
  lexers: {
    js: ['JavascriptLexer'],
    ts: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JsxLexer']
  },
  locales: ['en', 'ja', 'nl'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{ts,tsx}'],
  verbose: true,
  reactNamespace: false
}

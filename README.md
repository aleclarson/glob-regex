
# glob-regex v0.3.1

Convert a glob to a `RegExp` object.

- Any periods are escaped (`.` -> `\\.`)
- `*` and `**` are replaced
- Always start with `^` and end with `$`
- All `RegExp` syntax is valid
- Path separators are auto-escaped by `new RegExp`

```js
const globRegex = require('glob-regex')

// Match no directory.
let re = globRegex('*.js')
re.test('a.js') // => true
re.test('a.css') // => false
re.test('a/b.js') // => false

// Use ? operator for optional character.
re = globRegex('*.jsx?')
re.test('a.js') // => true
re.test('b.jsx') // => true

// Match any directory.
re = globRegex('**.css')
re.test('a.css') // => true
re.test('a/b.css') // => true

// Match any directory and specific name.
re = globRegex('**/a.css')
re.test('a.css') // => true
re.test('b/a.css') // => true

// Use | operator to match multiple values.
re = globRegex('*.(js|css)')
re.test('a.js') // => true
re.test('a.css') // => true
```

Use `globRegex.replace()` to transform a glob into a RegExp-compatible string.

**NOTE:** It's not recommended to use `globRegex(array)` if you need
the `exec` method, since the result will be difficult to make use of.
Using the `test` method works great, though!


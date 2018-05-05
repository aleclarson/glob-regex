#!/usr/bin/env node

const {test, group} = require('testpass')

const globRegex = require('.')

const tests = {
  '*.js': {
    'a.js': true,
    'bc.js': true,
    'a.css': false,
    'a/b.js': false,
    '.js': false,
    '': false,
  },
  '*/*.js': {
    'a.js': false,
    'a/b.js': true,
    'a/b/c.js': false,
    'a/b.css': false,
    '.js': false,
    '': false,
  },
  '**.js': {
    'a.js': true,
    'bc.js': true,
    'a/b.js': true,
    'a/b/c.js': true,
    'a/b/c.css': false,
    'a/b/c': false,
    'a/.js': false,
    '/a.js': false,
    '.js': false,
    '': false,
  },
  '**/a.js': {
    'a.js': true,
    'b.js': false,
    'a/b.js': false,
    'b/a.js': true,
    'b/aa.js': false,
    'c/b/a.js': true,
    '': false,
  },
  '*.jsx?': {
    'a.js': true,
    'b.jsx': true,
    'c.jsjsx': false,
    '.js': false,
    '': false,
  },
  '*.(css|scss)': {
    'a.css': true,
    'b.scss': true,
    'c.cssscss': false,
    '.css': false,
    '': false,
  }
}

Object.keys(tests).forEach(glob => {
  test(glob, (t) => {
    const re = globRegex(glob)
    match(t, re, glob)
  })
})

function match(t, re, glob) {
  const results = tests[glob]
  for (const path in results) {
    const result = results[path]
    if (re.test(path) != result) {
      t.fail('Expected ' + glob + ' to ' + (result ? '' : 'not ') + 'match ' + path)
    }
  }
}

test('the glob is wrapped with ^ and $', (t) => {
  const re = globRegex('*.js')
  t.assert(!re.test('a/b.js'))
  t.assert(!re.test('a.jsx'))
})

test('trailing ** is simplified', (t) => {
  const re = globRegex('a/**')
  t.eq(re.source, '^a\\/(.+)$')
})

test('an array can be passed', (t) => {
  const re = globRegex(['*.js', '*.css'])
  t.assert(!re.test('a.jsx'))
  t.assert(re.test('a.js'))
  t.assert(re.test('b.css'))
})

// [0] the input
group('capture groups:', () => {

  // [1] the filename
  test('*.js', (t) => {
    const re = globRegex('*.js')
    cap(t, re, 'a.js', 'a')
  })

  // [1] the directory (or null)
  // [2] the filename
  test('**.js', (t) => {
    const re = globRegex('**.js')
    cap(t, re, 'a.js', undefined, 'a')
    cap(t, re, 'a/b.js', 'a/', 'b')
  })

  // [1] the parent of __tests__
  // [2] the filename
  test('**/__tests__/*.js', (t) => {
    const re = globRegex('**/__tests__/*.js')
    cap(t, re, '__tests__/a.js', undefined, 'a')
    cap(t, re, 'a/b/__tests__/c.js', 'a/b/', 'c')
  })

  function cap(t, re, input, /*:: ...expected: string[] */) {
    const expected = [].slice.call(arguments, 2)
    re.lastIndex = 0
    t.eq(re.exec(input), expected)
  }
})

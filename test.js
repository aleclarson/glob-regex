#!/usr/bin/env node
// @flow

const {test} = require('testpass')

const globRegex = require('.')

const tests = {
  '*.js': {
    'a.js': true,
    'bc.js': true,
    'a.css': false,
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

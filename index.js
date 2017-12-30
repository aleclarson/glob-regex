
const dotRE = /\./g
const globAnyRE = /\*\*/g
const globEndRE = /\*\*$/g
const globDirsRE = /\*\*\//g
const globNamesRE = /\*/g

function globRegex(glob) {
  const source = Array.isArray(glob) ? join(glob) : convert(glob)
  return new RegExp('^' + source + '$')
}

function convert(glob) {
  return glob
    .replace(dotRE, '\\.')
    .replace(globDirsRE, '(.+/)?')
    .replace(globEndRE, '(.+)')
    .replace(globAnyRE, '(.+/)?([^/]+)')
    .replace(globNamesRE, '([^/]+)')
}

function join(globs) {
  return '((' + globs.map(convert).join(')|(') + '))'
}

module.exports = globRegex

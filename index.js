
const dotRE = /\./g
const globAnyRE = /\*\*/g
const globEndRE = /\*\*$/g
const globDirsRE = /\*\*\//g
const globNamesRE = /\*/g

function globRegex(glob) {
  if (Array.isArray(glob)) {
    glob = '((' + glob.join(')|(') + '))'
  }

  const pattern = glob
    .replace(dotRE, '\\.')
    .replace(globDirsRE, '(.+/)?')
    .replace(globEndRE, '(.+)?')
    .replace(globAnyRE, '(.+/)?([^/]+\/?)')
    .replace(globNamesRE, '([^/]+)')

  return new RegExp('^' + pattern + '$')
}

module.exports = globRegex

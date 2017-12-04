
const dotRE = /\./g
const globAllRE = /\*\*/g
const globDirsRE = /\*\*\//g
const globNamesRE = /\*/g

function globRegex(glob) {
  if (Array.isArray(glob)) {
    glob = '((' + glob.join(')|(') + '))'
  }

  const pattern = glob
    .replace(dotRE, '\\.')
    .replace(globDirsRE, '(.+/)?')
    .replace(globAllRE, '(.+/)?([^/]+\/?)')
    .replace(globNamesRE, '([^/]+)')

  return new RegExp('^' + pattern + '$')
}

module.exports = globRegex

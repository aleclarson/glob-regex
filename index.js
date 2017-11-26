
function globRegex(glob) {
  const pattern = glob
    .replace('.', '\\.')
    .replace('**/', '(.+\\/)?')
    .replace('**', '(.+\\/)?*')
    .replace('*', '[^\\/]+')

  return new RegExp('^' + pattern + '$')
}

module.exports = globRegex

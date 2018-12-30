const gitUrlParse = require('git-url-parse')

module.exports = function parseRepoUrl(url) {
  if (!url) {
    return undefined
  }
  let parsed = gitUrlParse(url)
  // This is probably not a URL.
  if (!parsed || parsed.protocols.length === 0) {
    return undefined
  }
  if (parsed.protocol === 'https') {
    return parsed.href
  }
  return gitUrlParse.stringify(parsed, 'https')
}

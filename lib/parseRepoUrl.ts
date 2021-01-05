import gitUrlParse from 'git-url-parse'

const parseRepoUrl = (url: string | undefined): string | undefined => {
  if (!url) {
    return undefined
  }
  const parsed = gitUrlParse(url)
  // This is probably not a URL.
  if (!parsed || parsed.protocols.length === 0) {
    return undefined
  }
  if (parsed.protocol === 'https') {
    return parsed.href
  }
  return gitUrlParse.stringify(parsed, 'https')
}

export default parseRepoUrl

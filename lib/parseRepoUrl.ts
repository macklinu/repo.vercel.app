import gitUrlParse from 'git-url-parse'

const isValidUrl = (url: string | undefined): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const parseRepoUrl = (url: string | undefined): string | undefined => {
  if (!url || !isValidUrl(url)) {
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

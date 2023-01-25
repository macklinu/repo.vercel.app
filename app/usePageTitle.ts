import { useMatches } from '@remix-run/react'
import { z } from 'zod'

export function usePageTitle() {
  const matches = useMatches()
  const match = matches.find((match) => !!match.handle?.pageTitle) ?? {
    handle: { pageTitle: 'vercel.repo.app' },
  }

  return z.string().parse(match.handle?.pageTitle)
}

import type { LinksFunction, V2_MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import octocat from './octocat.css'
import { OctocatCorner } from './OctocatCorner'
import { usePageTitle } from './usePageTitle'

export const meta: V2_MetaFunction = () => [
  { charSet: 'utf-8' },
  { title: 'repo.vercel.app' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
]

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css',
  },
  { rel: 'stylesheet', href: octocat },
  { rel: 'shortcut icon', href: '/shortcut-icon.ico' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
]
export default function App() {
  const pageTitle = usePageTitle()

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='sans-serif'>
        <OctocatCorner />
        <main className='pa3 ph5-ns'>
          <h1 className='f-headline-l f1 lh-solid' data-testid='app-title'>
            {pageTitle}
          </h1>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

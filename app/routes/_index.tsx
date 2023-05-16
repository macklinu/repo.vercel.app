import { Link } from '@remix-run/react'

const exampleLinks = [
  { packageName: 'lodash', backgroundColor: 'bg-light-red' },
  { packageName: 'express', backgroundColor: 'bg-light-green' },
  { packageName: '@babel/core', backgroundColor: 'bg-light-blue' },
  { packageName: '@zeit/ncc', backgroundColor: 'bg-gold' },
] as const

export default function IndexPage() {
  return (
    <>
      <p className='f3 lh-copy'>
        <span className='mr1' role='img' aria-label='Magnifying Glass'>
          🔎
        </span>
        Find the repo for any npm package name. Just append
        <code className='dib code'>/:pkg-name</code> to the URL.
      </p>
      <h2 className='f2 lh-title'>Try It</h2>
      <ul className='list pl0 f2-ns f3'>
        {exampleLinks.map(({ packageName, backgroundColor }) => (
          <li key={packageName}>
            <Link
              to={`/${packageName}`}
              className={`no-underline underline-hover link black ${backgroundColor} lh-copy pa1`}
            >
              repo.vercel.app/{packageName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

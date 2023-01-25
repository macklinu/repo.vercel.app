import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useCatch, useParams } from '@remix-run/react'
import { z } from 'zod'
import { getPackageRepo } from '~/getPackageRepo.server'

const paramsSchema = z
  .object({
    '*': z.string(),
  })
  .transform((params) => ({
    packageName: params['*'],
  }))

function usePackageNameParams() {
  return paramsSchema.parse(useParams())
}

export const handle = {
  pageTitle: 'Uh oh!',
}

export const meta: MetaFunction = ({ params }) => {
  const { packageName } = paramsSchema.parse(params)

  return {
    title: `${packageName} | repo.vercel.app`,
  }
}

export async function loader({ params }: LoaderArgs) {
  const { packageName } = paramsSchema.parse(params)
  const repoUrl = await getPackageRepo(packageName)
  if (!repoUrl) {
    throw json({ repoUrl: null })
  }

  return redirect(repoUrl)
}

export default function PackageRoute() {
  return null
}

export function CatchBoundary() {
  const { packageName } = usePackageNameParams()
  const caught = useCatch()

  switch (caught.status) {
    case 200:
      return (
        <section className='f3 lh-copy'>
          <p data-testid='error-message'>
            It looks like <span className='b'>{packageName}</span> doesn&apos;t
            have a repository defined in its package.json.
          </p>
          <p>Here&apos;s how you can help! 🙏</p>
          <section className='f4 lh-copy measure'>
            <p>
              Confirm{' '}
              <a
                href={`https://www.npmjs.com/package/${packageName}`}
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                {packageName}
              </a>{' '}
              exists on npm&apos;s website.
            </p>
            <p>
              Do you see a <b>repository</b> field in the right-hand column of
              the npm package page?
            </p>
            <img
              alt='screenshot of npm repository field'
              src='/npm-screenshot.png'
              width={357}
              height={169}
            />
            <p>
              ✅ <b>If there is a repository field</b>, please{' '}
              <a
                href='https://github.com/macklinu/repo.vercel.app/issues/new'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                file an issue on repo.vercel.app
              </a>
              , as this is an application error.
            </p>
            <p>
              ❌ <b>If there is not a repository field</b>, please find the
              package&apos;s repo online and open a pull request adding the
              repository field to its{' '}
              <a
                href='https://docs.npmjs.com/files/package.json#repository'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                package.json
              </a>
              .
            </p>
          </section>
        </section>
      )
    case 401:
      return (
        <section className='f3 lh-copy'>
          <p data-testid='error-message'>
            It looks like I was unauthorized to fetch{' '}
            <span className='b'>{packageName}</span> from the npm registry.
          </p>
          <p>Here&apos;s how you can help! 🙏</p>
          <section className='f4 lh-copy measure'>
            <p>
              ✅ <b>If {packageName} is private</b>, sorry, private packages are
              not supported by repo.vercel.app at this time.
            </p>
            <p>
              ❌ <b>If {packageName} is not private</b>, please{' '}
              <a
                href='https://github.com/macklinu/repo.vercel.app/issues/new'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                file an issue on repo.vercel.app
              </a>
              , as this is an application error.
            </p>
          </section>
        </section>
      )
    case 404:
      return (
        <section className='f3 lh-copy'>
          <p data-testid='error-message'>
            It looks like <b>{packageName}</b> wasn&apos;t found in the npm
            registry.
          </p>
          <p>Here&apos;s how you can help! 🙏</p>
          <section className='f4 lh-copy measure'>
            <p>
              Confirm{' '}
              <a
                href={`https://www.npmjs.com/package/${packageName}`}
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                {packageName}
              </a>{' '}
              exists on npm&apos;s website.
            </p>
            <p>
              ✅ <b>If the package exists</b>, please{' '}
              <a
                href='https://github.com/macklinu/repo.vercel.app/issues/new'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                file an issue on repo.vercel.app
              </a>
              , as this is an application error.
            </p>
            <p>
              ❌ <b>If the package does not exist</b>, sorry, I don&apos;t know
              what to tell you.
            </p>
          </section>
        </section>
      )
    case 500:
    default:
      return (
        <section className='f3 lh-copy'>
          <p data-testid='error-message'>
            It looks like something went wrong. 😅
          </p>
          <p>Here&apos;s how you can help! 🙏</p>
          <section className='f4 lh-copy measure'>
            <p>
              ✅ Please{' '}
              <a
                href='https://github.com/macklinu/repo.vercel.app/issues/new'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                file an issue on repo.vercel.app
              </a>
              , as this is an application error.
            </p>
          </section>
        </section>
      )
  }
}

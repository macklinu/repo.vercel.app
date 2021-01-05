import * as React from 'react'
import Image from 'next/image'
import type { GetServerSideProps } from 'next'
import getPackageRepo from 'lib/getPackageRepo'
import ErrorType from 'lib/ErrorType'
import SharedHead from 'lib/SharedHead'

interface ErrorComponentProps {
  packageName: string
  error: ErrorType
}

const ErrorComponent = ({ packageName, error }: ErrorComponentProps) => {
  switch (error) {
    case ErrorType.Unauthorized:
      return (
        <section className='f3 lh-copy'>
          <p>
            It looks like I was unauthorized to fetch{' '}
            <span className='b'>{packageName}</span> from the npm registry.
          </p>
          <p>Here's how you can help! 🙏</p>
          <section className='f4 lh-copy measure'>
            <p>
              ✅ <b>If {packageName} is private</b>, sorry, private packages are
              not supported by repo.now.sh at this time.
            </p>
            <p>
              ❌ <b>If {packageName} is not private</b>, please{' '}
              <a
                href='https://github.com/macklinu/repo.now.sh/issues/new'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                file an issue on repo.now.sh
              </a>
              , as this is an application error.
            </p>
          </section>
        </section>
      )
    case ErrorType.PackageMissingRepo:
      return (
        <section className='f3 lh-copy'>
          <p>
            It looks like <span className='b'>{packageName}</span> doesn't have
            a repository defined in its package.json.
          </p>
          <p>Here's how you can help! 🙏</p>
          <section className='f4 lh-copy measure'>
            <p>
              Confirm{' '}
              <a
                href={`https://www.npmjs.com/package/${packageName}`}
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                {packageName}
              </a>{' '}
              exists on npm's website.
            </p>
            <p>
              Do you see a <b>repository</b> field in the right-hand column of
              the npm package page?
            </p>
            <Image src='/npm-screenshot.png' width={357} height={169} />
            <p>
              ✅ <b>If there is a repository field</b>, please{' '}
              <a
                href='https://github.com/macklinu/repo.now.sh/issues/new'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                file an issue on repo.now.sh
              </a>
              , as this is an application error.
            </p>
            <p>
              ❌ <b>If there is not a repository field</b>, please find the
              package's repo online and open a pull request adding the
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
    case ErrorType.PackageNotFound:
      return (
        <section className='f3 lh-copy'>
          <p>
            It looks like <b>{packageName}</b> wasn't found in the npm registry.
          </p>
          <p>Here's how you can help! 🙏</p>
          <section className='f4 lh-copy measure'>
            <p>
              Confirm{' '}
              <a
                href={`https://www.npmjs.com/package/${packageName}`}
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                {packageName}
              </a>{' '}
              exists on npm's website.
            </p>
            <p>
              ✅ <b>If the package exists</b>, please{' '}
              <a
                href='https://github.com/macklinu/repo.now.sh/issues/new'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                file an issue on repo.now.sh
              </a>
              , as this is an application error.
            </p>
            <p>
              ❌ <b>If the package does not exist</b>, sorry, I don't know what
              to tell you.
            </p>
          </section>
        </section>
      )
    case ErrorType.UnknownError:
      return (
        <section className='f3 lh-copy'>
          <p>It looks like something went wrong. 😅</p>
          <p>Here's how you can help! 🙏</p>
          <section className='f4 lh-copy measure'>
            <p>
              ✅ Please{' '}
              <a
                href='https://github.com/macklinu/repo.now.sh/issues/new'
                className='no-underline underline-hover link black bg-light-blue pa1'
              >
                file an issue on repo.now.sh
              </a>
              , as this is an application error.
            </p>
          </section>
        </section>
      )
  }
}

interface PackageNamePageProps {
  packageName: string
  error: ErrorType
}

const PackageNamePage = ({ packageName, error }: PackageNamePageProps) => (
  <div className='sans-serif'>
    <SharedHead>
      <title>{packageName} | repo.now.sh</title>
    </SharedHead>
    <main className='pa3 ph5-ns'>
      <h1 className='f-headline-l f1 lh-solid'>Uh oh!</h1>
      <ErrorComponent packageName={packageName} error={error} />
    </main>
  </div>
)

export const getServerSideProps: GetServerSideProps<
  PackageNamePageProps,
  { packageName: string[] }
> = async ({ params }) => {
  const packageName = params.packageName.join('/')
  const packageResult = await getPackageRepo(packageName)
  switch (packageResult.status) {
    case 'success':
      return {
        redirect: { destination: packageResult.repo, permanent: true },
        props: {},
      }
    case 'error':
      return {
        props: { packageName, error: packageResult.error },
      }
  }
}

export default PackageNamePage

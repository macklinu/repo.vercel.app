const url = require('url')
const getPackageRepo = require('./lib/api/getPackageRepo')
const ErrorTypes = require('./lib/models/ErrorTypes')
const html = require('./lib/utils/html')

const createErrorComponent = err => {
  switch (err) {
    case ErrorTypes.Unauthorized: {
      return ({ pkg }) => html`
        <section class="f3 lh-copy">
          <p>
            It looks like I was unauthorized to fetch\
            <span class="b">${pkg}</span> from the npm registry.
          </p>
          <p>Here's how you can help! 🙏</p>
          <section class="f4 lh-copy measure">
            <p>
              ✅ <b>If ${pkg} is private</b>, sorry, private packages are not
              supported by repo.now.sh at this time.
            </p>
            <p>
              ❌ <b>If ${pkg} is not private</b>, please\
              <a
                href="https://github.com/macklinu/repo.now.sh/issues/new"
                class="no-underline underline-hover link black bg-light-blue pa1"
                >file an issue on repo.now.sh</a
              >, as this is an application error.
            </p>
          </section>
        </section>
      `
    }
    case ErrorTypes.PackageMissingRepo: {
      return ({ pkg }) => html`
        <section class="f3 lh-copy">
          <p data-testid="error-message">
            It looks like <span class="b">${pkg}</span> doesn't have a
            repository defined in its package.json.
          </p>
          <p>Here's how you can help! 🙏</p>
          <section class="f4 lh-copy measure">
            <p>
              Confirm\
              <a
                href=${`https://www.npmjs.com/package/${pkg}`}
                class="no-underline underline-hover link black bg-light-blue pa1"
                >${pkg}</a
              >\ exists on npm's website.
            </p>
            <p>
              Do you see a <b>repository</b> field in the right-hand column of
              the npm package page?
            </p>
            <img
              src="https://file-ioapobjbxn.now.sh/"
              width="357"
              height="169"
            />
            <p>
              ✅ <b>If there is a repository field</b>, please\
              <a
                href="https://github.com/macklinu/repo.now.sh/issues/new"
                class="no-underline underline-hover link black bg-light-blue pa1"
                >file an issue on repo.now.sh</a
              >, as this is an application error.
            </p>
            <p>
              ❌ <b>If there is not a repository field</b>, please find the
              package's repo online and open a pull request adding the
              repository field to its\
              <a
                href="https://docs.npmjs.com/files/package.json#repository"
                class="no-underline underline-hover link black bg-light-blue pa1"
                >package.json</a
              >.
            </p>
          </section>
        </section>
      `
    }
    case ErrorTypes.PackageNotFound: {
      return ({ pkg }) => html`
        <section class="f3 lh-copy">
          <p>It looks like <b>${pkg}</b> wasn't found in the npm registry.</p>
          <p>Here's how you can help! 🙏</p>
          <section class="f4 lh-copy measure">
            <p>
              Confirm\
              <a
                href=${`https://www.npmjs.com/package/${pkg}`}
                class="no-underline underline-hover link black bg-light-blue pa1"
                >${pkg}</a
              >\ exists on npm's website.
            </p>
            <p>
              ✅ <b>If the package exists</b>, please\
              <a
                href="https://github.com/macklinu/repo.now.sh/issues/new"
                class="no-underline underline-hover link black bg-light-blue pa1"
                >file an issue on repo.now.sh</a
              >, as this is an application error.
            </p>
            <p>
              ❌ <b>If the package does not exist</b>, sorry, I don't know what
              to tell you.
            </p>
          </section>
        </section>
      `
    }
    case ErrorTypes.UnknownError:
    default:
      return () =>
        html`
          <section class="f3 lh-copy">
            <p>It looks like something went wrong. 😅</p>
            <p>Here's how you can help! 🙏</p>
            <section class="f4 lh-copy measure">
              <p>
                ✅ Please\
                <a
                  href="https://github.com/macklinu/repo.now.sh/issues/new"
                  class="no-underline underline-hover link black bg-light-blue pa1"
                  >file an issue on repo.now.sh</a
                >, as this is an application error.
              </p>
            </section>
          </section>
        `
  }
}

const repoHandler = async (req, res) => {
  const { pathname } = url.parse(req.url, true)

  const pkg = pathname.substring(1)
  const { repo, err } = await getPackageRepo(pkg)

  if (repo) {
    res.writeHead(302, { Location: repo })
    res.end()
  } else {
    const ErrorComponent = createErrorComponent(err)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(
      html`
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="shortcut icon" href="https://file-qhodtymqhu.now.sh" />
            <link
              rel="apple-touch-icon"
              href="https://file-kxijpkqsxm.now.sh/"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://unpkg.com/tachyons@4.11.1/css/tachyons.min.css"
            />
            <title>repo.now.sh: ${pkg}</title>
          </head>
          <body class="sans-serif">
            <main class="pa3 ph5-ns">
              <h1 class="f-headline-l f1 lh-solid">Uh oh!</h1>
              <${ErrorComponent} pkg=${pkg} />
            </main>
          </body>
        </html>
      `
    )
  }
}

module.exports = repoHandler

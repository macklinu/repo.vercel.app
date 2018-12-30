const htm = require('htm')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const get = require('lodash/get')
const sample = require('lodash/sample')
const Container = require('../components/Container')
const InlineCode = require('../components/InlineCode')

const html = htm.bind(React.createElement)

function Index({ host, placeholder }) {
  let [pkgName, setPkgName] = React.useState('')
  let disabled = !pkgName

  let handleClick = () => console.log(`Go to /${pkgName}`)

  return html`
    <${Container}>
      <h1 className="mt0 f1 lh-title">repo</h1>
      <p className="f4 lh-copy">
        <span className="mr1" role="img" aria-label="Magnifying Glass">🔎</span
        >Find the repo for any npm package name.
      </p>
      <p className="f5 lh-copy">
        You can append <${InlineCode}>/:pkg<//> to this URL, where
        <${InlineCode}>:pkg<//> is the name of any npm package, and if that
        package has a repository associated with it, you will be redirected to
        the repo.
      </p>
      <p className="f5 lh-copy">
        This is great for quickly finding the repo for an npm package so you can
        view the source and/or contribute back!
        <span className="ml1" role="img" aria-label="Heart Eyes"> 😍 </span>
      </p>
      <form disabled=${disabled}>
        <div className="flex flex-row items-center f5">
          <div
            className="ph3 pv2 dib ba b--light-gray bg-light-gray br2 br--left"
          >
            ${host}/
          </div>
          <input
            className="input-reset pa2 ba b--light-gray"
            type="text"
            placeholder=${placeholder}
            value=${pkgName}
            onChange=${e => setPkgName(e.target.value)}
          />
          <button
            type="submit"
            disabled=${disabled}
            className="ba b--light-gray br2 br--right ph3 pv2 dib bg-light-gray hover-bg-moon-gray pointer bg-animate"
            onClick=${handleClick}
          >
            Go
          </button>
        </div>
      </form>
    <//>
  `
}

module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })

  let host = get(req, 'headers.host', '')
  let placeholder = sample([
    'lodash',
    'express',
    'tachyons',
    'react',
    'eslint',
    '@zeit/ncc',
    '@types/react',
  ])

  ReactDOMServer.renderToNodeStream(
    html`
      <html lang="en">
        <head>
          <title>repo</title>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/tachyons@4.11.1/css/tachyons.min.css"
          />
        </head>
        <body className="sans-serif">
          <${Index} host=${host} placeholder=${placeholder} />
        </body>
      </html>
    `
  ).pipe(res)
}

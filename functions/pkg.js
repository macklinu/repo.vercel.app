const htm = require('htm')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const url = require('url')
const html = htm.bind(React.createElement)

function Pkg({ pkg }) {
  return html`
    <div>Hello ${pkg}</div>
  `
}

module.exports = (req, res) => {
  let { pathname } = url.parse(req.url, true)

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
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
          <${Pkg} pkg=${pathname} />
        </body>
      </html>
    `
  ).pipe(res)
}

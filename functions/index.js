const htm = require('htm')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const html = htm.bind(React.createElement)

module.exports = (req, res) => {
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
          <h1>repo.now.sh</h1>
        </body>
      </html>
    `
  ).pipe(res)
}

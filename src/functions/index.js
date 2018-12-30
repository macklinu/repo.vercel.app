const get = require('lodash/get')
const sample = require('lodash/sample')
const Container = require('../components/Container')
const InlineCode = require('../components/InlineCode')
const html = require('../utils/html')

function Index({ host, placeholder }) {
  return html`
    <${Container}>
      <h1 class="mt0 f1 lh-title">repo</h1>
      <p class="f4 lh-copy">
        <span class="mr1" role="img" aria-label="Magnifying Glass">🔎</span>Find
        the repo for any npm package name.
      </p>
      <p class="f5 lh-copy">
        You can append <${InlineCode}>/:pkg<//> to this URL, where
        <${InlineCode}>:pkg<//> is the name of any npm package, and if that
        package has a repository associated with it, you will be redirected to
        the repo.
      </p>
      <p class="f5 lh-copy">
        This is great for quickly finding the repo for an npm package so you can
        view the source and/or contribute back!
        <span class="ml1" role="img" aria-label="Heart Eyes"> 😍 </span>
      </p>
      <div class="flex flex-row items-center f5">
        <div class="ph3 pv2 dib ba b--light-gray bg-light-gray br2 br--left">
          ${host}/
        </div>
        <input
          id="pkg-input"
          class="input-reset pa2 ba b--light-gray"
          type="text"
          placeholder=${placeholder}
        />
        <button
          id="pkg-submit-button"
          type="submit"
          class="ba b--light-gray br2 br--right ph3 pv2 dib bg-light-gray hover-bg-moon-gray pointer bg-animate"
        >
          Go
        </button>
      </div>
    <//>
  `
}

module.exports = (req, res) => {
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

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.write(`
    <html lang="en">
      <head>
        <title>repo</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/tachyons@4.11.1/css/tachyons.min.css"
        />
      </head>
  `)
  res.write(html`
    <body class="sans-serif">
      <${Index} host=${host} placeholder=${placeholder} />
    </body>
  `)
  res.write(/* HTML */ `
    <script>
      let pkgInput = document.getElementById('pkg-input')
      let pkgSubmitButton = document.getElementById('pkg-submit-button')
      pkgSubmitButton.addEventListener('click', () => {
        console.log(pkgInput.value)
      })
    </script>
  `)
  res.write(`</html>`)
  res.end()
}

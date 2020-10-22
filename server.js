/* eslint-disable no-console */

const { createServer } = require('http')
const { parse } = require('url')
const { createReadStream } = require('fs')
const pkg = require('./pkg')

const port = process.env.PORT ? Number(process.env.PORT) : 3000

createServer((req, res) => {
  const { pathname } = parse(req.url)
  if (pathname === '/') {
    return createReadStream('./index.html').pipe(res)
  } else {
    return pkg(req, res)
  }
}).listen(port, (err) => {
  if (err) {
    throw err
  }
  console.log(`> Listening on port ${port}`)
})

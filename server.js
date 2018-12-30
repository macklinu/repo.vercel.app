const { createServer } = require('http')
const { parse } = require('url')
const index = require('./functions/index')
const pkg = require('./functions/pkg')

const port = process.env.PORT ? Number(process.env.PORT) : 3000

createServer((req, res) => {
  let { pathname } = parse(req.url)
  if (pathname === '/') {
    return index(req, res)
  } else {
    return pkg(req, res)
  }
}).listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`> Ready on http://localhost:${port}`)
})

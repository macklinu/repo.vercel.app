const html = require('../utils/html')

module.exports = function InlineCode({ children }) {
  return html`
    <code className="dib code">${children}</code>
  `
}

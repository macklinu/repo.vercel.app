const html = require('../utils/html')

module.exports = function InlineCode({ children }) {
  return html`
    <code class="dib code">${children}</code>
  `
}

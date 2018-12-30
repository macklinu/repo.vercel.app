const html = require('../utils/html')

module.exports = function Container({ children }) {
  return html`
    <section className="mw5 mw7-ns center pa3 ph5-ns">${children}</section>
  `
}

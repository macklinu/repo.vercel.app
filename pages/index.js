import React, { useState } from 'react'
import { get } from 'lodash-es'
import { FaGithub, FaNpm } from 'react-icons/fa'
import { parse } from 'url'

function Index({ href }) {
  let [pkgName, setPkgName] = useState('')
  let url = parse(`${href}/${pkgName}`)

  return (
    <>
      <h1>pkg-repo</h1>
      <div>
        <FaNpm size='32px' />
        <span>➡️</span>
        <FaGithub size='32px' />
      </div>
      <input
        type='text'
        value={pkgName}
        onChange={e => setPkgName(e.target.value)}
      />
      <pre>{url.href}</pre>
      <button type='submit' disabled={!pkgName}>
        Go!
      </button>
    </>
  )
}

Index.getInitialProps = async ({ req }) => {
  function getHref() {
    if (req) {
      let protocol = get(req, 'connection.encrypted') ? 'https' : 'http'
      let hostname = get(req, 'headers.host', '')
      return `${protocol}://${hostname}`
    } else {
      return get(window, 'location.href')
    }
  }

  return { href: getHref() }
}

export default Index

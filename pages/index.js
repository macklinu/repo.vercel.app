import React, { useState } from 'react'
import Router from 'next/router'
import { resolve } from 'url'
import { get, sample } from 'lodash-es'
import { Container, InlineCode } from '@/components'

function Index({ href, placeholder }) {
  let [pkgName, setPkgName] = useState('')
  let disabled = !pkgName

  return (
    <Container>
      <h1 className='mt0 f1 lh-title'>pkg-repo</h1>
      <p className='f4 lh-copy'>
        <span className='mr1' role='img' aria-label='Magnifying Glass'>
          🔎
        </span>{' '}
        Find the repo for any npm package name.
      </p>
      <p className='f5 lh-copy'>
        You can append <InlineCode>/:pkg</InlineCode> to this URL, where{' '}
        <InlineCode>:pkg</InlineCode> is the name of any npm package, and if
        that package has a repository associated with it, you will be redirected
        to the repo.
      </p>
      <p className='f5 lh-copy'>
        This is great for quickly finding the repo for an npm package so you can
        view the source and/or contribute back!
        <span className='ml1' role='img' aria-label='Heart Eyes'>
          😍
        </span>
      </p>
      <form disabled={disabled}>
        <div className='flex flex-row items-center f5'>
          <div className='ph3 pv2 dib ba b--light-gray bg-light-gray br2 br--left'>
            {href}/
          </div>
          <input
            className='input-reset pa2 ba b--light-gray'
            type='text'
            placeholder={placeholder}
            value={pkgName}
            onChange={e => setPkgName(e.target.value)}
          />
          <button
            type='submit'
            disabled={disabled}
            className='ba b--light-gray br2 br--right ph3 pv2 dib bg-light-gray hover-bg-moon-gray pointer bg-animate'
            onClick={() => {
              Router.push(resolve(href, pkgName))
            }}
          >
            Go
          </button>
        </div>
      </form>
    </Container>
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

  return {
    href: getHref(),
    placeholder: sample([
      'lodash',
      'express',
      'tachyons',
      'react',
      'eslint',
      '@zeit/ncc',
      '@types/react',
    ]),
  }
}

export default Index

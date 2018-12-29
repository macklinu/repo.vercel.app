import React from 'react'
import App from 'next/app'

import 'normalize.css'
import 'tachyons'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    let { Component, pageProps } = this.props

    return (
      <main className='sans-serif'>
        <Component {...pageProps} />
      </main>
    )
  }
}

import * as React from 'react'
import Head from 'next/head'

interface SharedHeadProps {
  children: React.ReactNode | React.ReactNode[]
}

export const SharedHead = ({ children }: SharedHeadProps) => (
  <Head>
    <meta charSet='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
    <link rel='shortcut icon' href='/shortcut-icon.ico' />
    <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
    {children}
  </Head>
)

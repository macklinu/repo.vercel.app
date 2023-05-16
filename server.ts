import { createRequestHandler } from '@vercel/remix/server'
import * as build from '@remix-run/dev/server-build'
import { installGlobals } from '@remix-run/node'

installGlobals()

export default createRequestHandler({ build, mode: process.env.NODE_ENV })

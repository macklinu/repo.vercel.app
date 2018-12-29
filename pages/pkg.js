import React from 'react'
import Router from 'next/router'
import { parse } from 'url'
import { Container } from '@/components'
import { ErrorTypes } from '@/models'
import { getPackageRepo } from '@/api'

function Pkg({ pkgName, err }) {
  let ErrorComponent = getErrorComponent(err)
  ErrorComponent.displayName = `Error.${err}`
  return (
    <Container>
      <ErrorComponent pkgName={pkgName} />
    </Container>
  )
}

Pkg.getInitialProps = async ({ asPath, res }) => {
  function redirect(to) {
    if (res) {
      res.writeHead(302, {
        Location: to,
      })
      res.end()
    } else {
      Router.push(to)
    }
  }

  let pkgName = getPathname(asPath).substring(1)
  let { repo, err } = await getPackageRepo(pkgName)
  if (repo) {
    redirect(repo)
  } else {
    return { pkgName, err }
  }
}

function getErrorComponent(err) {
  return {
    [ErrorTypes.Unauthorized]({ pkgName }) {
      return err
    },
    [ErrorTypes.PackageMissingRepo]({ pkgName }) {
      return err
    },
    [ErrorTypes.PackageNotFound]({ pkgName }) {
      return err
    },
    [ErrorTypes.UnknownError]({ pkgName }) {
      return err
    },
  }[err]
}

function getPathname(asPath) {
  let url = parse(asPath)
  return url.pathname
}

export default Pkg

import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import { get } from 'lodash-es'
import { fromUrl } from 'hosted-git-info'
import { parse } from 'url'

const ErrorTypes = {
  Unauthorized: 'Unauthorized',
  PackageMissingRepo: 'PackageMissingRepo',
  PackageNotFound: 'PackageNotFound',
  UnknownError: 'UnknownError',
}

function Pkg({ pkgName, err }) {
  return <pre>{JSON.stringify({ pkgName, err }, null, 2)}</pre>
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

async function getPackageRepo(pkgName) {
  try {
    let { data } = await axios.get(
      `https://registry.npmjs.org/${encodeURIComponent(pkgName)}`
    )
    let repoUrl = get(data, 'repository.url', '')
    let gitInfo = fromUrl(repoUrl, { noGitPlus: true })
    return gitInfo
      ? { repo: gitInfo.browse() }
      : { err: ErrorTypes.PackageMissingRepo }
  } catch (err) {
    console.error(err.message)
    let status = get(err, 'response.status')
    return {
      err:
        status === 401
          ? ErrorTypes.Unauthorized
          : status === 404
          ? ErrorTypes.PackageNotFound
          : ErrorTypes.UnknownError,
    }
  }
}

function getPathname(asPath) {
  let url = parse(asPath)
  return url.pathname
}

export default Pkg

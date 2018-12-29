import axios from 'axios'
import { get } from 'lodash-es'
import { ErrorTypes } from '@/models'
import { parseRepoUrl } from '@/utils'

export default async function getPackageRepo(pkgName) {
  try {
    let { data } = await axios.get(
      `https://registry.npmjs.org/${encodeURIComponent(pkgName)}`
    )
    let repoUrl = get(data, 'repository.url', '')
    let repo = parseRepoUrl(repoUrl)
    return repo ? { repo } : { err: ErrorTypes.PackageMissingRepo }
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

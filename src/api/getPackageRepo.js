import axios from 'axios'
import { get } from 'lodash-es'
import { ErrorTypes } from '@/models'
import { parseRepoUrl } from '@/utils'

const statusToErrorType = {
  401: ErrorTypes.Unauthorized,
  404: ErrorTypes.PackageNotFound,
}

export default async function getPackageRepo(pkgName) {
  try {
    let url = `https://registry.npmjs.org/${encodeURIComponent(pkgName)}`
    let { data } = await axios.get(url)
    let repo = parseRepoUrl(get(data, 'repository.url', ''))
    return repo ? { repo } : { err: ErrorTypes.PackageMissingRepo }
  } catch (error) {
    console.error(error.message)
    let status = get(error, 'response.status')
    return {
      err: statusToErrorType[status] || ErrorTypes.UnknownError,
    }
  }
}

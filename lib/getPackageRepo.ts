import axios from 'axios'
import ErrorType from './ErrorType'
import parseRepoUrl from './parseRepoUrl'

const statusToErrorType = {
  401: ErrorType.Unauthorized,
  404: ErrorType.PackageNotFound,
}

type GetPackageRepoResult =
  | { status: 'success'; repo: string }
  | { status: 'error'; error: ErrorType }

const getPackageRepo = async (
  packageName: string
): Promise<GetPackageRepoResult> => {
  try {
    const url = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`
    const { data } = await axios.get(url)
    const repo = parseRepoUrl(data?.repository?.url)
    return repo
      ? { status: 'success', repo }
      : { status: 'error', error: ErrorType.PackageMissingRepo }
  } catch (error) {
    const status = error.response?.status
    return {
      status: 'error',
      error: statusToErrorType[status] || ErrorType.UnknownError,
    }
  }
}

export default getPackageRepo

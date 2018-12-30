const axios = require('axios')
const get = require('lodash/get')
const ErrorTypes = require('../models/ErrorTypes')
const parseRepoUrl = require('../utils/parseRepoUrl')

const statusToErrorType = {
  401: ErrorTypes.Unauthorized,
  404: ErrorTypes.PackageNotFound,
}

module.exports = async function getPackageRepo(pkgName) {
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

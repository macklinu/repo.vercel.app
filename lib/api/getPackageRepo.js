const axios = require('axios')
const get = require('lodash/get')
const ErrorTypes = require('../models/ErrorTypes')
const parseRepoUrl = require('../utils/parseRepoUrl')

const statusToErrorType = {
  401: ErrorTypes.Unauthorized,
  404: ErrorTypes.PackageNotFound,
}

const getPackageRepo = async pkgName => {
  try {
    const url = `https://registry.npmjs.org/${encodeURIComponent(pkgName)}`
    const { data } = await axios.get(url)
    const repo = parseRepoUrl(get(data, 'repository.url', ''))
    return repo ? { repo } : { err: ErrorTypes.PackageMissingRepo }
  } catch (error) {
    const status = get(error, 'response.status')
    return {
      err: statusToErrorType[status] || ErrorTypes.UnknownError,
    }
  }
}

module.exports = getPackageRepo

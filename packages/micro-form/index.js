const microCors = require('micro-cors')
const parseBody = require('urlencoded-body-parser')
const R = require('ramda')

const LIST_SPLIT_CHAR = ','
const DEFAULT_ALLOW_METHODS = 'POST'
const DEFAULT_FIELDS_WHITELIST = ''

const options = {
  allowMethods: R.pipe(
    R.pathOr(DEFAULT_ALLOW_METHODS, ['ALLOW_METHODS']),
    R.toUpper,
    R.split(LIST_SPLIT_CHAR)
  )(process.env),
  fieldsWhitelist: R.pipe(
    R.pathOr(DEFAULT_FIELDS_WHITELIST, ['FIELDS_WHITELIST']),
    R.split(LIST_SPLIT_CHAR)
  )(process.env),
}

const handler = async req =>
  R.pipeP(
    parseBody,
    R.pick(options.fieldsWhitelist)
  )(req)

const cors = microCors({ allowMethods: options.allowMethods })
module.exports = cors(handler)

const microCors = require('micro-cors')
const parseBody = require('urlencoded-body-parser')
const R = require('ramda')

const LIST_SPLIT_CHAR = ','

const options = {
  /***
   * process.env.MICRO_FORM_ID
   *
   * Identifier for the form.
   *
   * Default: 'micro-form'.
   */
  id: R.pathOr('micro-form', ['MICRO_FORM_ID'], process.env),

  /***
   * process.env.MICRO_FORM_ALLOW_METHODS
   *
   * List of HTTP methods to accept.
   *
   * Default: 'POST'.
   */
  allowMethods: R.pipe(
    R.pathOr('POST', ['MICRO_FORM_ALLOW_METHODS']),
    R.toUpper,
    R.split(LIST_SPLIT_CHAR)
  )(process.env),

  /***
   * process.env.MICRO_FORM_FIELDS_WHITELIST
   *
   * List of field names to accept.
   *
   * Default: ''.
   */
  fieldsWhitelist: R.pipe(
    R.pathOr('', ['MICRO_FORM_FIELDS_WHITELIST']),
    R.split(LIST_SPLIT_CHAR)
  )(process.env),
}

const handler = async req => ({
  id: options.id,
  fields: await R.pipeP(
    parseBody,
    R.pick(options.fieldsWhitelist)
  )(req),
})

const cors = microCors({ allowMethods: options.allowMethods })
module.exports = cors(handler)

const { json } = require('micro')
const microCors = require('micro-cors')
const ses = require('node-ses')
const R = require('ramda')

const sesClient = ses.createClient({
  key: process.env.AMAZON_SES_KEY,
  secret: process.env.AMAZON_SES_SECRET,
})

const handler = async req => {
  const data = await json(req)
  return data
}

const cors = microCors({ allowMethods: ['POST'] })
module.exports = cors(handler)

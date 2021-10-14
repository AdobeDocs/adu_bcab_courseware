/*
* brief-delete
*/

const { Core } = require('@adobe/aio-sdk')
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils')
const filesLib = require('@adobe/aio-lib-files')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action brief-delete')

    // check for missing request input parameters and headers
    const requiredParams = ['briefIds']
    const requiredHeaders = ['Authorization']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    const files = await filesLib.init()
    
    for(let briefId of params.briefIds){
      await files.delete(`briefs/${briefId}.json`)
    }

    return{
      statusCode:200,
      body: params.briefIds
    }
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main

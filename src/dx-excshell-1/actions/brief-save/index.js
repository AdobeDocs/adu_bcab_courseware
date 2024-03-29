/*
* Brief Save
*
* sample params data
* {"briefDate":"1-1-2021","copyDate":"2-3-2021","releasePrintDate":"3-1-2021","requestType":"new-brief","campaign":"123","deliverables":" ","description":"new magic shoe social campaign","selectedAssets":"1,2,3"}
*
* Debug tips
* set DEBUG=@adobe/aio-lib-files* to see debug logs.
*
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
    logger.info('Calling the main action brief-save')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = [
      'briefDate',
      'copyDate',
      'releasePrintDate',
      'requestType',
      'campaign',
      'deliverables',
      'description',
      'selectedAssets'
    ]
    const requiredHeaders = ['Authorization']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    const files = await filesLib.init()
    let briefRequest = {}
    
    for (const fieldName in requiredParams) {
      briefRequest[requiredParams[fieldName]] = params[requiredParams[fieldName]];
    }

    const requestFileId = new Date().getTime()
    briefRequest['id'] = requestFileId

    const existingFile = await files.list(`briefs/${requestFileId}.json`)

    if(!existingFile.length){
      await files.write(`briefs/${requestFileId}.json`,JSON.stringify(briefRequest))
      return{
        statusCode: 200,
        body: briefRequest
      }
    }else{
      return errorResponse(400, `Brief with same name exists ${requestFileId}`, logger)
    }

  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main

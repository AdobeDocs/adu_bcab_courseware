const { Core } = require('@adobe/aio-sdk');
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils');
const filesLib = require('@adobe/aio-lib-files');

async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });
  logger.debug(stringParameters(params));

  const requiredParams = ['briefIds'];

  const requiredHeaders = ['Authorization'];

  const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders);

  if (errorMessage) {
    // return and log client errors
    return errorResponse(400, errorMessage, logger);
  }

  try{
    const { briefIds } = params;
    const files = await filesLib.init();

    for (const briefId of briefIds) {
      await files.delete(`briefs/${briefId}.json`);
    }

    const response = {
      statusCode: 200,
      body: briefIds
    };

    return response;
  } catch (error) {
    // log any server errors
    logger.error(error);
    // return with 500
    return errorResponse(500, 'server error', logger);
  }
}

exports.main = main;

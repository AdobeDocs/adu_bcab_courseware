const { Core } = require('@adobe/aio-sdk');
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils');
const filesLib = require('@adobe/aio-lib-files');

async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });
  logger.debug(stringParameters(params));

  const requiredParams = [
    'briefDate',
    'copyDate',
    'releasePrintDate',
    'requestType',
    'campaign',
    'deliverables',
    'description',
    'selectedAssets'
  ];

  const requiredHeaders = ['Authorization'];

  const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders);

  if (errorMessage) {
    // return and log client errors
    return errorResponse(400, errorMessage, logger);
  }

  const files = await filesLib.init();
  let briefRequest = {};

  for (const fieldName in requiredParams) {
    briefRequest[requiredParams[fieldName]] = params[requiredParams[fieldName]];
  }

  const requestFileId = new Date().getTime();

  briefRequest['id'] = requestFileId;

  const existingFile = await files.list(`briefs/${requestFileId}.json`);

  logger.debug(JSON.stringify(briefRequest));

  if (!existingFile.length) {
    await files.write(`briefs/${requestFileId}.json`, JSON.stringify(briefRequest));
  } else {
    return errorResponse(400, 'Brief with that name exists', logger);
  }

  const response = {
    statusCode: 200,
    body: briefRequest
  };

  return response;
}

exports.main = main;

const { Core } = require('@adobe/aio-sdk');
const { errorResponse, checkMissingRequestInputs } = require('../utils');
const filesLib = require('@adobe/aio-lib-files');

async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });

  const requiredHeaders = ['Authorization'];
  const errorMessage = checkMissingRequestInputs(params, [], requiredHeaders);

  if (errorMessage) {
    // return and log client errors
    return errorResponse(400, errorMessage, logger);
  }

  const files = await filesLib.init();
  const existingFiles = await files.list('/');

  if (!existingFiles.length) {
    return errorResponse(400, 'No briefs found', logger);
  }

  const body = [];

  for (const { name } of existingFiles) {
    // Filter out briefs only and retrieve the file content
    if (name.startsWith('briefs/')) {
      const buffer = await files.read(name);
      body.push(JSON.parse(buffer.toString()));
    }
  }

  const response = {
    statusCode: 200,
    body
  };

  return response;
}

exports.main = main;

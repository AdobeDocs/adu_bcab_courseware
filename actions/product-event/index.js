/*
 * Example Product event handling Action
 */

const { Core } = require('@adobe/aio-sdk');
const { errorResponse, stringParameters } = require('../utils');

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });

  try {
    logger.info('Calling the product-event action');

    logger.debug(stringParameters(params));

    let response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: ''
    };

    // Handle challenge request
    if (params.challenge) {
      logger.debug(`Responding to challenge ${params.challenge}`);

      /*
      response.body = new Buffer(JSON.stringify({
            "challenge": params.challenge
      })).toString('base64');
      */

      response.body = {
        challenge: params.challenge
      };

      return response;
    } else {
      // HANDLE EVENT AND DO SOME WORK
      return response;
    }
  } catch (error) {
    // log any server errors
    logger.error(error);
    // return with 500
    return errorResponse(500, 'server error', logger);
  }
}

exports.main = main;

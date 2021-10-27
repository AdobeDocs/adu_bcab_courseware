/*
 * Example Product event handling Action
 */
const fetch = require('node-fetch'); // added to make call to Trello
const { Core } = require('@adobe/aio-sdk');
const { errorResponse, stringParameters } = require('../utils');

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });

  try {
    logger.info('Calling the brief-create-event-handler action');

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
      logger.debug(`In new brief created event handler`);
      //Fetch the details of the Brief from the File store

      //take name and description and pass them to trello
      const cardName = `Creative Brief Request ${params.data.briefRequestId}`;
      const cardDescription = `Campaign ${params.data.briefCampaign}`;

      // HANDLE EVENT AND DO SOME WORK NAMELY POST data about new creative brief to our Trello Board
      const apiEndpoint = `https://api.trello.com/1/cards?name=${cardName}&desc=${cardDescription}&idList=${params.trelloListId}&key=${trelloKey}&token=${trelloToken}`;
      logger.debug(`In new brief created event handler and calling ${apiEndpoint}`);

      const callOptions = {
        method: "POST",
        headers: { "Accept": "application/json" }
      };

      // fetch content from external api endpoint
      const res = await fetch(apiEndpoint,callOptions);
      if (!res.ok) {
        logger.error(res);
        logger.error(await error.response.text());
        throw new Error('request to Trello failed with status code ' + res.status);
      }
      const trelloCallResultContent = await res.json();
      logger.debug(`Trello response ${JSON.stringify(trelloCallResultContent)}`);
      response.body = trelloCallResultContent; // add to response body the json results from trello
      
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

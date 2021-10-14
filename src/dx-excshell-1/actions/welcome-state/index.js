/*****
 * Training example where we use the state to see if the user has ever logged in before...
 * TODO:// think of a better use case for state in our demo app
 * 
 * sample params
 * {"userId":"db3","userData":{"fullName":"Sally Smith"}}
 */
const { Core } = require('@adobe/aio-sdk');
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils');
const stateLib = require('@adobe/aio-lib-state');

async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });
  logger.debug(stringParameters(params));

  // This is an array were we check that required parameters were sent.
  //    We should also be checking for type and lengths.  This is just to check for existence
  //    {"userId":"dbenge","userData":{"fullName":"david Benge"}}
  const requiredParams = ['userId'];
  const requiredHeaders = ['Authorization'];
  const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders);

  // If the util found any issues we should return an error message to the user and stop processing
  if (errorMessage) {
    // return and log client errors
    return errorResponse(400, errorMessage, logger);
  }

  // now that we have at least the basic requirements checked and we know its a valid request lets create the state lib
  //      since stateLib.init is async call we will need to aWAIT on it to complete.
  const state = await stateLib.init();
  // from our state store now we get the name key
  const storedUser = await state.get(`${params.userId}`);

  if (storedUser) {
    return {
      statusCode: 200,
      body: {
        message: `Hi ${storedUser.value.fullName}. Nice to see you again today.`
      }
    };
  } else {
    if(!params.hasOwnProperty('userData')){
      params.userData = {
        "fullName": "No Name"
      }
    }

    if(!params.userData.hasOwnProperty('fullName')){
      params.userData.fullName = "No Name"
    }

    // Now we are going to store userId in the key and userData as the value in the state store
    // We could set the time to live option to -1 for no expiry but since this is a training course we will make the data ttl 86400 (24 hours).
    // This means the data will be purged in 24hrs
    await state.put(`${params.userId}`, params.userData, { ttl: 86400 });

    return {
      statusCode: 200,
      body: {
        message: `Welcome ${params.userData.fullName}.`
      }
    };
  }
}

exports.main = main;
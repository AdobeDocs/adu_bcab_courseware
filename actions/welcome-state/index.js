/*****
 * Training example where we use the state to see if the user has ever logged in before...
 * TODO:// think of a better use case for state in our demo app
 */
const { Core } = require('@adobe/aio-sdk');
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils');
const stateLib = require('@adobe/aio-lib-state');

async function main(params) {
  const DEFAULT_NAME = 'No name';
  let body = {};

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
  // Get the name value from the params object
  const { userId, userName } = params;
  // from our state store now we get the name key
  const storedUser = await state.get(`${userId}`);

  if (storedUser) {
    let name = storedUser.value;

    // Update user name
    if (userName && storedUser.value !== userName) {
      name = userName;
      await state.put(`${userId}`, name, { ttl: 86400 });
    }

    body = {
      message: `Hi ${name} ! Nice to see you again today.`
    };
  } else {
    // Now we are going to store userId in the key and userData as the value in the state store
    // We could set the time to live option to -1 for no expiry but since this is a training course we will make the data ttl 86400 (24 hours).
    // This means the data will be purged in 24hrs
    const name = userName || DEFAULT_NAME;
    await state.put(`${userId}`, name, { ttl: 86400 });

    body = { message: `Welcome ${name} !` };
  }

  return {
    statusCode: 200,
    body
  };
}

exports.main = main;

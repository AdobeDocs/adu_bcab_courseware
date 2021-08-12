/*
 * <license header>
 */

const { Config } = require('@adobe/aio-sdk').Core;
const fs = require('fs');
const fetch = require('node-fetch');
const JSON5 = require('json5');
// require('dotenv').config() // load .env if available
// const { context, getToken, getTokenData } = require('@adobe/aio-lib-ims')
// let authToken;

// get action url
const namespace = Config.get('runtime.namespace');
const hostname = Config.get('cna.hostname') || 'adobeioruntime.net';
const packagejson = JSON.parse(fs.readFileSync('package.json').toString());
const runtimePackage = `${packagejson.name}-${packagejson.version}`;
const actionUrl = `https://${namespace}.${hostname}/api/v1/web/${runtimePackage}/stock-search`;

jest.setTimeout(10000);

// The deployed actions are secured with the `require-adobe-auth` annotation.
// If the authorization header is missing, Adobe I/O Runtime returns with a 401 before the action is executed.
test('returns a 401 when missing Authorization header', async () => {
  const res = await fetch(actionUrl);
  expect(res).toEqual(
    expect.objectContaining({
      status: 401
    })
  );
});

test('returns a 200 with dog search', async () => {
  // let token = await getTestingAuthToken();
  const {token} = JSON.parse(fs.readFileSync('token.json'));
  const {ims_org_id} = JSON5.parse(fs.readFileSync('.aio', 'utf8')).project.org;
  
  const res = await fetch(`${actionUrl}?keyword=dogs`,{
    method: 'GET',
    headers:{
      authorization: `Bearer ${token}`,
      'x-gw-ims-org-id': ims_org_id
    }
  });
  expect(res).toEqual(
    expect.objectContaining({
      status: 200
    })
  );
});

// const getTestingAuthToken = (async () =>{
//   if(!authToken){
//     const config = {
//       client_id: process.env.AIO_ims_contexts_training__project__J__1625172383287_client__id,
//         client_secret: process.env.AIO_ims_contexts_training__project__J__1625172383287_client__secret,
//         technical_account_id: process.env.AIO_ims_contexts_training__project__J__1625172383287_technical__account__id,
//         meta_scopes: [
//           "ent_user_sdk"
//         ],
//         ims_org_id: process.env.AIO_ims_contexts_training__project__J__1625172383287_ims__org__id,
//         private_key: process.env.AIO_ims_contexts_training__project__J__1625172383287_client__private_key
//     };
//     await context.set('example', config, true)
//
//     authToken = await getToken('example')
//   }
//
//   return authToken;
// });

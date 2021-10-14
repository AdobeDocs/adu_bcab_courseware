/*
 * <license header>
 */

/* global fetch */

/**
 *
 * Invokes a web action
 *
 * @param  {object} ims
 * @param  {string} actionUrl
 * @param {object} headers
 * @param  {object} params
 *
 * @returns {Promise<string|object>} the response
 *
 */
async function actionWebInvoke(ims, actionUrl, headers = {}, params = {}) {
  try {
    // set the authorization header and org from the ims props object
    if (ims.token && !headers.authorization) {
      headers.authorization = `Bearer ${ims.token}`;
    }
    if (ims.org && !headers['x-gw-ims-org-id']) {
      headers['x-gw-ims-org-id'] = ims.org;
    }

    const actionHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    if (window.location.hostname === 'localhost') {
      actionHeaders['x-ow-extra-logging'] = 'on';
    }

    const response = await fetch(actionUrl, {
      method: 'post',
      headers: actionHeaders,
      body: JSON.stringify(params)
    });
    let content = await response.text();
    if (!response.ok) {
      throw new Error(`failed request to '${actionUrl}' with status: ${response.status} and message: ${content}`);
    }

    return JSON.parse(content);
  } catch (e) {
    return { error: e };
  }
}

export default actionWebInvoke;

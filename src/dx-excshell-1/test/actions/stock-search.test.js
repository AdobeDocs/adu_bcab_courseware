/*
 * <license header>
 */

jest.mock('@adobe/aio-sdk', () => ({
  Core: {
    Logger: jest.fn()
  }
}));

const { Core } = require('@adobe/aio-sdk');
const mockLoggerInstance = { info: jest.fn(), debug: jest.fn(), error: jest.fn() };
Core.Logger.mockReturnValue(mockLoggerInstance);

jest.mock('node-fetch');
const fetch = require('node-fetch');
const action = require('./../../actions/stock-search/index.js');

beforeEach(() => {
  Core.Logger.mockClear();
  mockLoggerInstance.info.mockReset();
  mockLoggerInstance.debug.mockReset();
  mockLoggerInstance.error.mockReset();
});

const fakeParams = { __ow_headers: { authorization: 'Bearer fake' } };
jest.setTimeout(10000);
describe('stock-search',() => {
  test('main should be defined', (async () => {
    expect(action.main).toBeInstanceOf(Function);
  }));
  
  test('should set logger to use LOG_LEVEL param', async () => {
    await action.main({ ...fakeParams, LOG_LEVEL: 'fakeLevel' });
    expect(Core.Logger).toHaveBeenCalledWith(expect.any(String), { level: 'fakeLevel' });
  });

  test('should return an http response with the fetched content', async () => {
    const mockFetchResponse = {
      ok: true,
      json: () => Promise.resolve({ content: 'fake' })
    };
    fetch.mockResolvedValue(mockFetchResponse);
    const response = await action.main({...fakeParams,keyword:'dog'});
    expect(response).toEqual({
      statusCode: 200,
      body: { content: 'fake' }
    });
  });

  test('if there is an error should return a 500 and log the error', async () => {
    const fakeError = new Error('fake');
    fetch.mockRejectedValue(fakeError);
    const response = await action.main({...fakeParams,keyword:'dog'});
    expect(response).toEqual({
      error: {
        statusCode: 500,
        body: { error: 'server error' }
      }
    });
    expect(mockLoggerInstance.error).toHaveBeenCalledWith(fakeError);
  });

  test('if returned service status code is not ok should return a 500 and log the status', async () => {
    const mockFetchResponse = {
      ok: false,
      status: 404
    };
    fetch.mockResolvedValue(mockFetchResponse);
    const response = await action.main({...fakeParams,keyword:'dog'});
    expect(response).toEqual({
      error: {
        statusCode: 500,
        body: { error: 'server error' }
      }
    });
    // error message should contain 404
    expect(mockLoggerInstance.error).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('404') })
    );
  });

  test('missing input request parameters, should return 400', async () => {
    const response = await action.main({});
    expect(response).toEqual({
      error: {
        statusCode: 400,
        body: { error: "missing header(s) 'authorization' and missing parameter(s) 'keyword'" }
      }
    });
  });
});
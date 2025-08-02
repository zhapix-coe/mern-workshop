/**
 * @jest-environment node
 */

import { delay, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node';
import { fetchUser, fetchUserWithCB } from '../../src/core/api';
export const handlers = [
  http.get('http://test.com/api/user', async () => {
    await delay(150)
    return HttpResponse.json('Anand Kumar')
  })
]
const server = setupServer(...handlers)

describe('Validation of API Interaction', () => {

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Validate get Response:async/await', async () => {
    const data = await fetchUser();
    expect(data).toBe("Anand Kumar")
  })

  test('Validate get Response:async/await',  (done) => {
    const cbFunction = () => {
          done();      
    }

    const data =  fetchUserWithCB(cbFunction);
    
  })


});
// // This is a Jest test, fyi

// import configureMockStore from 'redux-mock-store'
// import { apiMiddleware } from 'redux-api-middleware'
// import thunk from 'redux-thunk'
// import fetchMock from 'fetch-mock'

// import {getUser} from './user'

// const middlewares = [ thunk, apiMiddleware ]
// const mockStore = configureMockStore(middlewares)

// describe('async user actions', () => {
//   // If we have several tests in our test suit, we might want to
//   // reset and restore the mocks after each test to avoid unexpected behaviors
//   afterEach(() => {
//     fetchMock.reset()
//     fetchMock.restore()
//   })

//   it('should dispatch USER_SUCCESS when getUser is called', () => {
//     // We create a mock store for our test data.
//     const store = mockStore({})

//     const body = {
//       email: 'EMAIL',
//       username: 'USERNAME'
//     }
//     // We build the mock for the fetch request.
//     // beware that the url must match the action endpoint.
//     fetchMock.getOnce(`https://hostname/api/users/`, {body: body, headers: {'content-type': 'application/json'}})
//     // We are going to verify the response with the following actions
//     const expectedActions = [
//       {type: actions.USER_REQUEST},
//       {type: actions.USER_SUCCESS, payload: body}
//     ]
//     return store.dispatch(actions.getUser()).then(() => {
//       // Verify that all the actions in the store are the expected ones
//       expect(store.getActions()).toEqual(expectedActions)
//     })
//   })
// })
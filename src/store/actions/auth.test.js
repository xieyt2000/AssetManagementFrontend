import * as Actions from './auth'
import sinon from 'sinon'
import '@/mock'
describe('actions/auth', () => {
  let actions
  let dispatchSpy
  beforeEach(function () {
    actions = []
    dispatchSpy = sinon.spy(action => {
      actions.push(action)
    })
  })
  it('test login', async () => {
    Actions.login('admin', 'admin')(dispatchSpy)
      .then((data) => {
        expect(actions.length).toBe(1)
      })
      .catch((err) => {
        expect(actions.length).toBe(0)
        console.log(err)
      })
  })

  it('test logout', async () => {
    Actions.logout('token')(dispatchSpy)
      .then((data) => {
        expect(actions.length).toBe(1)
      })
      .catch((err) => {
        expect(actions.length).toBe(0)
        console.log(err)
      })
  })
})

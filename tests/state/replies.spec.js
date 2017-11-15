import test from 'tape'
import { when, observable, autorun, toJS } from 'mobx'
import MockRequester from '../mockRequester'
import TestStateInit from '../../state/replies'

const comment = {
  id: 1,
  reply: null
}
class BaseState {
  @observable currentView = {
    comment: comment
  }
}
const State = TestStateInit(BaseState)

function _createState() {
  const state = new State()
  state.requester = new MockRequester()
  return state
}

test('it should be possible to loadReplies', t => {
  const state = _createState()
  state.requester.data = [{
    "id": 1,
    "commentid": 1,
    "uid": "frodo@shire.nz",
    "content": "reply 1 on comment 1.",
    "created": "2012-08-22"
  }, {
    "id": 2,
    "commentid": 1,
    "uid": "Sigurd O'Conner",
    "content": "reply 2 on comment 1.",
    "created": "2012-09-02"
  }]

  state.loadReplies(state.currentView, state.currentView.comment)

  setTimeout(() => {
    t.equal(state.currentView.comment.replies.length, 2)
    t.equal(state.currentView.comment.replies[0].content, 'reply 1 on comment 1.')
    t.equal(state.currentView.comment.replies[1].content, 'reply 2 on comment 1.')
    t.end()
  }, 500)
})

test('it should be possible to compose and send reply', t => {
  const state = _createState()
  let changes = []
  state.requester.data = []
  state.loadReplies(state.currentView, state.currentView.comment)
  state.updateReply(state.currentView.comment, 'frodo is about to leave')

  autorun(() => changes.push(toJS(state.currentView.comment)))
  state.sendReply(state.currentView.comment)

  setTimeout(() => {
    t.equal(state.currentView.comment.reply, null)  // shall reset reply
    t.equal(state.requester.entityName, 'replies', 'req with approp entityName')
    t.deepEqual(state.requester.data, {
      uid: 111,
      commentid: state.currentView.comment.id,
      content: 'frodo is about to leave'
    })
    t.equal(state.currentView.comment.replies.length, 1)
    t.ok(state.currentView.comment.replies.map !== undefined, 'comment.replies is observable')
    t.equal(changes.length, 2)  // intial val & this produced by sendReply
    t.end()
  }, 400)
})

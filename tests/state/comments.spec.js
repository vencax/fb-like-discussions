import test from 'tape'
import { when, observable, autorun, toJS } from 'mobx'
import MockRequester from '../mockRequester'
import TestStateInit from '../../state/comments'

class BaseState {
  @observable currentView = {
    discussion: {id: 1, comments: []}
  }
  getLoggedUserId() { return 111 }
}
const State = TestStateInit(BaseState)
const state = new State()
state.requester = new MockRequester()

test('it should be possible to loadComments', t => {
  state.requester.data = [{
    id: 1,
    parent: 1,
    rating: 1,
    author: "frodo@shire.nz",
    reply_count: 2,
    body: "Queen, tossing 'If it had lost something; and she felt sure it.",
    created: "2012-08-02"
  }]
  state.loadComments(state.currentView, state.currentView.discussion)
  setTimeout(() => {
    t.equal(state.currentView.discussion.comments.length, 1, 'loaded 1 comments')
    t.equal(state.currentView.shownDiscussion, state.currentView.discussion,
      'shownDiscussion is set to view')
    t.end()
  }, 500)
})

test('it should be possible to start compose and cancel comment', t => {
  // start compose reply
  state.composeComment(state.currentView.discussion)
  t.equal(state.currentView.discussion.comment, '')
  // cancel composing
  state.composeComment(state.currentView.discussion, false)
  t.equal(state.currentView.discussion.comment, null)
  t.end()
})

test('it should be possible to compose and send comment', t => {
  let changes = []
  state.composeComment(state.currentView.discussion)
  state.updateComment(state.currentView.discussion, 'ring fellowship has appeared')

  autorun(() => changes.push(toJS(state.currentView.discussion.comments)))
  state.sendComment(state.currentView.discussion)

  setTimeout(() => {
    t.equal(state.currentView.discussion.comment, null)  // shall reset reply
    t.equal(state.requester.entityName, 'comments', 'req with approp entityName')
    t.deepEqual(state.requester.data, {
      parent: state.currentView.discussion.id,
      author: 111,
      body: 'ring fellowship has appeared'
    }, 'req with approp data')
    t.equal(state.currentView.discussion.comments.length, 2)
    t.ok(state.currentView.discussion.comments.map !== undefined, 'discussion.comments is observable')
    t.equal(changes.length, 2, 'changes: intial val & this produced by sendComment')
    t.end()
  }, 400)
})

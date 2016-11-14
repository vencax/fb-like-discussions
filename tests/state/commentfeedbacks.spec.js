import test from 'tape'
import { when, observable, autorun, toJS } from 'mobx'
import MockRequester from '../mockRequester'
import TestStateInit from '../../state/commentfeedbacks'

class BaseState {
  constructor(comment) {
    this.currentView = observable({comments: [comment]})
  }
  getLoggedUserId() {
    return 111
  }
}
const State = TestStateInit(BaseState)

function _createState(comment) {
  const state = new State(comment)
  state.requester = new MockRequester()
  return state
}

test('it should be possible to loadCommentFeedbacks', t => {
  const state = _createState({id: 1, rating: 12})
  state.requester.data = [{id: 1, uid: 3, commentid: 1, feedback: 1}]
  state.loadCommentFeedbacks(state.currentView.comments)
  setTimeout(() => {
    t.equal(state.currentView.comments[0].feedback.feedback, 1)
    t.end()
  }, 500)
})

test('it should be possible to upvote comment', t => {
  const state = _createState({id: 1, rating: 12, feedback: null})
  let changes = []
  autorun(() => changes.push(toJS(state.currentView.comments[0])))
  t.ok(state.currentView.comments[0].feedback === null)

  state.upvote(state.currentView.comments[0]) // perform action

  setTimeout(() => {
    t.equal(state.currentView.comments[0].rating, 13, 'rating increased')
    t.equal(state.requester.entityName, 'commentfeedbacks', 'right entityName')
    t.deepEqual(state.requester.data, {
      feedback: 1,
      commentid: state.currentView.comments[0].id,
      uid: 111
    }, 'req with approp data')
    t.end()
  }, 500)

})

test('it must NOT be possible to upvote already upvoted comment', t => {
  const state = _createState({id: 1, rating: 12, feedback: {
    feedback: 1,
    commentid: 1,
    uid: 111
  }})
  let changes = []
  autorun(() => changes.push(toJS(state.currentView.comments[0])))
  t.equal(state.currentView.comments[0].feedback.feedback, 1)

  state.upvote(state.currentView.comments[0]) // perform action

  setTimeout(() => {
    t.equal(state.currentView.comments[0].rating, 12, 'rating NOT changed')
    t.equal(state.requester.data, null, 'no req performed')
    t.equal(changes.length, 1, 'no change to data done')
    t.end()
  }, 500)
})

test('it should be possible to downvote comment', t => {
  const state = _createState({id: 1, rating: 12, feedback: null})
  let changes = []
  autorun(() => changes.push(toJS(state.currentView.comments[0])))
  t.ok(state.currentView.comments[0].feedback === null)

  state.downvote(state.currentView.comments[0]) // perform action

  setTimeout(() => {
    t.equal(state.currentView.comments[0].rating, 11, 'rating decreased')
    t.equal(state.requester.entityName, 'commentfeedbacks', 'right entityName')
    t.deepEqual(state.requester.data, {
      feedback: -1,
      commentid: state.currentView.comments[0].id,
      uid: 111
    }, 'req with approp data')
    t.end()
  }, 500)

})

test('it must NOT be possible to downvote already downvoted comment', t => {
  const state = _createState({id: 1, rating: 12, feedback: {
    feedback: -1,
    commentid: 1,
    uid: 111
  }})
  let changes = []
  autorun(() => changes.push(toJS(state.currentView.comments[0])))
  t.equal(state.currentView.comments[0].feedback.feedback, -1)

  state.downvote(state.currentView.comments[0]) // perform action

  setTimeout(() => {
    t.equal(state.currentView.comments[0].rating, 12, 'rating NOT changed')
    t.equal(state.requester.data, null, 'no req performed')
    t.equal(changes.length, 1, 'no change to data done')
    t.end()
  }, 500)

})

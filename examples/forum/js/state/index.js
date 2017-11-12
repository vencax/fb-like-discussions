import { observable, computed, toJS, action } from 'mobx'
import BaseState from './base'
import CommentsStateInit from 'fb-like-comments/state'

const CommentsState = CommentsStateInit(BaseState)

export default class StateStore extends CommentsState {

  @computed get currentPath() {
    const viewName = this.currentView ? this.currentView.name : 'login'
    switch(viewName) {
      case 'login': return '/login'
      case 'discussions': return `/discussions`
      case 'singlediscussion': return `/discussion/${this.currentView.discussionid}`
    }
  }

  @action loadComments(state, discussion, opts = {page: 1, perPage: 10}) {
    this.requester.getEntries(`comments`, {parent: 1})
    .then(this.onCommentsLoaded(state, discussion, opts))
  }

  @action showLogin() {
    this.initView('login')
  }

  @action showDiscussions() {
    this.initView('discussions', {
      discussions: [],
      shownDiscussion: null
    })
    state.shownDiscussion.comments = []  // delete current
    state.shownDiscussion = discussion
    this.loadDiscussions(this.currentView)
  }

  @action showDiscussion(id) {
    this.initView('singlediscussion', {
      discussion: null,
      discussionid: id
    })
    this.loadDiscussion(this.currentView, id)
  }

}

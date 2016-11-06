import { action, extendObservable } from 'mobx'

export default (BaseClass) => class DiscussionsState extends BaseClass {

  loadDiscussions(state, opts = {}) {
    this.requester.getEntries('discussions', {
      page: opts.page || 1,
      perPage: opts.perPage || 10
    }).then((result) => {
      result.data.map((i) => i.replies = [])
      extendObservable(state, {
        discussions: result.data,
        totalDiscusions: result.totalItems
      })
    })
  }

  @action loadReplies(state, discussion) {
    if(state.shownDiscussion) {
      state.shownDiscussion.replies = []  // delete current
    }
    this.requester.getEntries('replies', {
      filters: {parent: discussion.id},
      page: 1,
      perPage: 5
    })
    .then((result) => {
      discussion.replies = result.data
      extendObservable(state, {
        shownDiscussion: discussion,
        totalReplies: result.totalItems
      })
    })
  }

  @action upvote(reply) {
    reply.rating = reply.rating + 1
  }

  @action downvote(reply) {
    reply.rating = reply.rating - 1
  }

}

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

  @action loadReplies(discussion) {
    this.requester.getEntries('replies', {
      filters: {parent: discussion.id},
      page: 1,
      perPage: 5
    })
    .then((result) => {
      discussion.replies = result.data
    })
  }

  @action upvote(reply) {
    reply.rating = reply.rating + 1
  }

  @action downvote(reply) {
    reply.rating = reply.rating - 1
  }

}

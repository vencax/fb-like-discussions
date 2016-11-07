import { action, extendObservable } from 'mobx'

export default (BaseClass) => class RepliesState extends BaseClass {

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

  @action composeReply(discussion) {
    discussion.reply = ''
  }

  @action sendReply(discussion) {
    this.requester.saveEntry('replies', {
      parent: discussion.id,
      author: "frodo@shire.nz",
      body: discussion.reply
    }).then((data) => {
      discussion.replies.push(data)
      discussion.reply = null
    })
  }

  @action updateReply(discussion, val) {
    discussion.reply = val
  }

}

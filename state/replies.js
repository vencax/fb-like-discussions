import { action, extendObservable, transaction } from 'mobx'

export default (BaseClass) => class RepliesState extends BaseClass {

  @action loadReplies(state, comment) {
    if(state.shownComment) {
      state.shownComment.replies = []  // delete current
    }
    return this.requester.getEntries('replies', {
      filters: {commentid: comment.id},
      page: 1,
      perPage: 5
    })
    .then((result) => {
      transaction(() => {
        comment.replies = result.data
        extendObservable(state, {
          shownComment: comment,
          totalReplies: result.totalItems
        })
      })
    })
  }

  @action composeReply(comment, status = true) {
    comment.reply = status ? '' : null
  }

  @action sendReply(comment) {
    this.requester.call('/replies', 'post', {
      commentid: comment.id,
      author: this.getLoggedUserId(),
      body: comment.reply
    }).then((data) => {
      transaction(() => {
        comment.replies.push(data)
        comment.reply = null
      })
    })
  }

  @action updateReply(comment, val) {
    comment.reply = val
  }

}

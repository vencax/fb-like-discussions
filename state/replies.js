import { action, extendObservable, transaction } from 'mobx'

export default (BaseClass) => class RepliesState extends BaseClass {

  @action loadReplies(state, comment, page = 1) {
    const perPage = this.replyPageSize || 20
    if(state.shownComment) {
      state.shownComment.replies = []  // delete current
    }
    return this.requester.getReplies(comment.id, {page, perPage})
    .then((result) => {
      transaction(() => {
        extendObservable(state, {shownComment: comment})
        comment.replies = result.data
        extendObservable(comment, {
          totalReplies: result.totalItems, page, perPage,
          lastPage: Math.round(result.totalItems / perPage)
        })
      })
    })
  }

  @action composeReply(comment, status = true) {
    comment.reply = status ? '' : null
  }

  @action sendReply(comment) {
    this.requester.postReply(comment).then((data) => {
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

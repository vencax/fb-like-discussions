import { action, extendObservable } from 'mobx'

export default (BaseClass) => class RepliesState extends BaseClass {

  @action
  loadReplies(state, comment, page = 1) {
    const perPage = this.replyPageSize || 20
    if(state.shownComment) {
      state.shownComment.replies = null  // delete current
      state.shownComment.lastPage = null
    }
    const _onDone = action('onRepliesLoaded', (result) => {
      extendObservable(state, {shownComment: comment})
      extendObservable(comment, {
        replies: result.data,
        totalReplies: result.totalItems, page, perPage,
        lastPage: Math.round(result.totalItems / perPage)
      })
    })
    return this.requester.getReplies(comment.id, {page, perPage}).then(_onDone)
  }

  @action
  composeReply(comment, status = true) {
    comment.reply = status ? '' : null
  }

  @action
  sendReply(state, comment) {
    const _onDone = action('onReplySaved', (data) => {
      if (comment.replies === null) {
        extendObservable(state, {shownComment: comment})
        extendObservable(comment, {
          replies: [data],
          totalReplies: 1, page: 1, perPage: this.replyPageSize || 20,
          lastPage: 1
        })
      } else {
        comment.replies.push(data)
      }
      comment.reply = null
      comment.reply_count += 1
    })
    this.requester.postReply(comment).then(_onDone)
  }

  @action
  updateReply(comment, val) {
    comment.reply = val
  }

}

import { action, extendObservable } from 'mobx'

export default (BaseClass) => class RepliesState extends BaseClass {

  @action
  loadReplies(state, comment, page = 1) {
    const perPage = this.replyPageSize || 20
    if(state.shownComment) {
      state.shownComment.replies = []  // delete current
    }
    const _onDone = action('onRepliesLoaded', (result) => {
      extendObservable(state, {shownComment: comment})
      comment.replies = result.data
      extendObservable(comment, {
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
  sendReply(comment) {
    const _onDone = action('onReplySaved', (data) => {
      comment.replies.push(data)
      comment.reply = null
    })
    this.requester.postReply(comment).then(_onDone)
  }

  @action
  updateReply(comment, val) {
    comment.reply = val
  }

}

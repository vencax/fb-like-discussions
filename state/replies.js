import { action, extendObservable } from 'mobx'

export default (BaseClass) => class RepliesState extends BaseClass {

  @action
  loadReplies(state, comment) {
    if(state.shownComment) {
      state.shownComment.replies = null  // delete current
      state.shownComment.reply = null
    }
    const _onDone = action('onRepliesLoaded', (result) => {
      extendObservable(state, {shownComment: comment})
      comment.reply = ''
      extendObservable(comment, {
        replies: result.data
      })
      return result.data
    })
    return this.requester.getReplies(comment.id).then(_onDone)
  }

  @action
  onReply(comment, reply) {
    comment.reply = reply === null ? '' : reply.uid.toString()
  }

  @action
  sendReply(state, comment) {
    const _onDone = action('onReplySaved', (data) => {
      if (comment.replies === null) {
        extendObservable(state, {shownComment: comment})
        extendObservable(comment, {
          replies: [data]
        })
      } else {
        comment.replies.push(data)
      }
      comment.reply = ''
      comment.reply_count += 1
      return data
    })
    return this.requester.postReply(comment).then(_onDone)
  }

  @action
  updateReply(comment, val) {
    comment.reply = val
  }

}

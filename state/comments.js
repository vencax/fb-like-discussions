import { action, extendObservable } from 'mobx'
import CommentFeedbacksStateInit from './commentfeedbacks'

export default (BaseClass) => class CommentsState extends CommentFeedbacksStateInit(BaseClass) {

  onCommentsLoaded(state, discussion, opts) {
    return action('onCommentsLoaded', (result) => {
      result.data.map((comment) => {
        comment.replies = null
        comment.reply = null
        comment.feedback = null
      })
      discussion.comments = result.data
      extendObservable(discussion, {
        totalComments: result.totalItems,
        lastPage: Math.round(result.totalItems / opts.perPage),
        page: opts.page, perPage: opts.perPage
      })
      this.loadCommentFeedbacks(discussion.comments)
    })
  }

  @action composeComment(discussion, status = true) {
    discussion.comment = status ? '' : null
  }

  @action sendComment(discussion) {
    const _onDone = action('onCommentSaved', (newitem) => {
      newitem.replies = null
      newitem.reply = null
      newitem.feedback = null
      discussion.comments.push(newitem)
      discussion.comment = null
      discussion.comment_count += 1
    })
    this.requester.postComment(discussion).then(_onDone)
  }

  @action updateComment(discussion, val) {
    discussion.comment = val
  }

}

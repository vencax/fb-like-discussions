import { action, extendObservable } from 'mobx'
import CommentFeedbacksStateInit from './commentfeedbacks'

export default (BaseClass) => class CommentsState extends CommentFeedbacksStateInit(BaseClass) {

  @action loadComments(state, discussion, opts = {page: 1, perPage: 10, loadFeedbacks: false}) {
    if(state.shownDiscussion) {
      state.shownDiscussion.comments = []  // delete current
    }
    const _onDone = action('onCommentsLoaded', (result) => {
      result.data.map((comment) => {
        comment.replies = null
        comment.reply = null
        comment.feedback = null
      })
      discussion.comments = result.data
      extendObservable(state, {shownDiscussion: discussion})
      extendObservable(discussion, {
        totalComments: result.totalItems,
        lastPage: Math.round(result.totalItems / opts.perPage) || 1,
        page: opts.page, perPage: opts.perPage
      })
      opts.loadFeedbacks && this.loadCommentFeedbacks(discussion.comments)
      return result.data
    })
    return this.requester.getComments(discussion.id, opts).then(_onDone)
  }

  @action sendComment(discussion) {
    const _onDone = action('onCommentSaved', (newitem) => {
      newitem.replies = null
      newitem.reply = null
      newitem.feedback = null
      discussion.comments.push(newitem)
      discussion.comment = ''
      discussion.comment_count += 1
      return newitem
    })
    return this.requester.postComment(discussion).then(_onDone)
  }

  @action updateComment(discussion, val) {
    discussion.comment = val
  }

}

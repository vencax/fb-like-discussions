import { action, extendObservable } from 'mobx'
import CommentFeedbacksStateInit from './commentfeedbacks'

export default (BaseClass) => class CommentsState extends CommentFeedbacksStateInit(BaseClass) {

  @action loadComments(state, discussion, page = 1, perPage = 10) {
    if(state.shownDiscussion) {
      state.shownDiscussion.comments = []  // delete current
    }
    const _onDone = action('onCommentsLoaded', (result) => {
      result.data.map((comment) => {
        comment.replies = []
        comment.reply = null
        comment.feedback = null
      })
      discussion.comments = result.data
      extendObservable(state, {shownDiscussion: discussion})
      extendObservable(discussion, {
        totalComments: result.totalItems, page, perPage,
        lastPage: Math.round(result.totalItems / perPage),
        page, perPage
      })
      this.loadCommentFeedbacks(discussion.comments)
    })
    this.requester.getComments(discussion.id, {page, perPage}).then(_onDone)
  }

  @action composeComment(discussion, status = true) {
    discussion.comment = status ? '' : null
  }

  @action sendComment(discussion) {
    const _onDone = action('onCommentSaved', (data) => {
      data.replies = []
      discussion.comments.push(data)
      discussion.comment = null
    })
    this.requester.postComment(discussion).then(_onDone)
  }

  @action updateComment(discussion, val) {
    discussion.comment = val
  }

}

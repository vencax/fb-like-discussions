import { action, extendObservable, transaction } from 'mobx'
import CommentFeedbacksStateInit from './commentfeedbacks'

export default (BaseClass) => class CommentsState extends CommentFeedbacksStateInit(BaseClass) {

  @action loadComments(state, discussion, page = 1) {
    const perPage = this.commentPageSize || 10
    if(state.shownDiscussion) {
      state.shownDiscussion.comments = []  // delete current
    }
    this.requester.getComments(discussion.id, {page, perPage})
    .then((result) => {
      result.data.map((comment) => {
        comment.replies = []
        comment.reply = null
        comment.feedback = null
      })
      discussion.comments = result.data
      extendObservable(state, {shownDiscussion: discussion})
      extendObservable(discussion, {
        totalComments: result.totalItems, page, perPage,
        lastPage: Math.round(result.totalItems / perPage)
      })
      this.loadCommentFeedbacks(discussion.comments)
    })
  }

  @action composeComment(discussion, status = true) {
    discussion.comment = status ? '' : null
  }

  @action sendComment(discussion) {
    this.requester.postComment(discussion).then((data) => {
      transaction(() => {
        data.replies = []
        discussion.comments.push(data)
        discussion.comment = null
      })
    })
  }

  @action updateComment(discussion, val) {
    discussion.comment = val
  }

}

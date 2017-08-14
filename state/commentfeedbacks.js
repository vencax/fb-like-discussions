import { action, extendObservable } from 'mobx'
import RepliesStateInit from './replies'

export default (BaseClass) => class CommentFeedbacksState extends RepliesStateInit(BaseClass) {

  @action
  upvote(comment) {
    if(comment.feedback && comment.feedback.feedback === -1) {
      // delete previous downvote
      return this.requester.deleteCommentFeedback(comment).then(() => {
        comment.feedback = null
        comment.downvotes = comment.downvotes - 1
      })
    } else if(comment.feedback === null) {
      // add upvote
      return this.requester.postCommentFeedback(comment, 1).then((result) => {
        comment.feedback = result
        comment.upvotes = comment.upvotes + 1
      })
    }
  }

  @action
  downvote(comment) {
    if(comment.feedback && comment.feedback.feedback === 1) {
      // delete previous upvote
      return this.requester.deleteCommentFeedback(comment).then(() => {
        comment.feedback = null
        comment.upvotes = comment.upvotes - 1
      })
    } else if(comment.feedback === null) {
      // add downvotes
      return this.requester.postCommentFeedback(comment, -1).then((result) => {
        comment.feedback = result
        comment.downvotes = comment.downvotes + 1
      })
    }
  }

  loadCommentFeedbacks(comments) {
    comments.map((comment) => {
      const _onDone = action('onFeedbackLoaded', (result) => {
        if(result.data.length > 0) {
          comment.feedback = result.data[0]
        }
      })
      this.requester.getFeedback(comment).then(_onDone)
    })
  }

}

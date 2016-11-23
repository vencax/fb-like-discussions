import { action, extendObservable, transaction } from 'mobx'
import RepliesStateInit from './replies'

export default (BaseClass) => class CommentFeedbacksState extends RepliesStateInit(BaseClass) {

  @action upvote(comment) {
    if(comment.feedback && comment.feedback.feedback === -1) {
      // delete previous downvote
      return this.requester.deleteEntry('commentfeedbacks', comment.feedback.id).then(() => {
        comment.feedback = null
        comment.downvotes = comment.downvotes - 1
      })
    } else if(comment.feedback === null) {
      // add upvote
      return this.requester.saveEntry('commentfeedbacks', {
        feedback: 1,
        commentid: comment.id,
        uid: this.getLoggedUserId()
      }).then((result) => {
        comment.feedback = result
        comment.upvotes = comment.upvotes + 1
      })
    }
  }

  @action downvote(comment) {
    if(comment.feedback && comment.feedback.feedback === 1) {
      // delete previous upvote
      return this.requester.deleteEntry('commentfeedbacks', comment.feedback.id).then(() => {
        comment.feedback = null
        comment.upvotes = comment.upvotes - 1
      })
    } else if(comment.feedback === null) {
      // add downvotes
      return this.requester.saveEntry('commentfeedbacks', {
        feedback: -1,
        commentid: comment.id,
        uid: this.getLoggedUserId()
      }).then((result) => {
        comment.feedback = result
        comment.downvotes = comment.downvotes + 1
      })
    }
  }

  loadCommentFeedbacks(comments) {
    comments.map((comment) => {
      this.requester.getEntries('commentfeedbacks', {
        filters: {
          commentid: comment.id,
          uid: this.getLoggedUserId()
        },
        page: 1,
        perPage: 1
      })
      .then((result) => {
        if(result.data.length > 0) {
          comment.feedback = result.data[0]
        }
      })
    })
  }

}

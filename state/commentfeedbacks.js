import { action, extendObservable, transaction } from 'mobx'

export default (BaseClass) => class CommentFeedbacksState extends BaseClass {

  @action upvote(comment) {
    if(comment.feedback && comment.feedback.feedback === -1) {
      this.requester.deleteEntry('commentfeedbacks', comment.feedback.id).then(() => {
        comment.feedback = null
        comment.rating = comment.rating + 1
      })
    } else if(comment.feedback === null) {
      this.requester.saveEntry('commentfeedbacks', {
        feedback: 1,
        commentid: comment.id,
        uid: this.getLoggedUserId()
      }).then((result) => {
        comment.feedback = result
        comment.rating = comment.rating + 1
      })
    }
  }

  @action downvote(comment) {
    if(comment.feedback && comment.feedback.feedback === 1) {
      this.requester.deleteEntry('commentfeedbacks', comment.feedback.id).then(() => {
        comment.feedback = null
        comment.rating = comment.rating - 1
      })
    } else if(comment.feedback === null) {
      this.requester.saveEntry('commentfeedbacks', {
        feedback: -1,
        commentid: comment.id,
        uid: this.getLoggedUserId()
      }).then((result) => {
        comment.feedback = result
        comment.rating = comment.rating - 1
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

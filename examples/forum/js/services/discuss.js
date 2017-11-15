
export default (BaseClass) => class DiscussRequester extends BaseClass {

  getLoggedUserId() {
    return 111
  }

  getDiscussions (opts) {
    const qpars = {
      page: opts.page || 1,
      perPage: opts.perPage || 10
    }
    return this.getEntries('discussions', opts)
  }

  getDiscussion (id) {
    return this.getEntry('discussions', id)
  }

  getComments (discussionID, opts) {
    return this.getEntries('comments', Object.assign({
      filters: {parent: discussionID}
    }, opts))
  }

  postComment (discussion) {
    return this.saveEntry('comments', {
      parent: discussion.id,
      uid: this.getLoggedUserId(),
      content: discussion.comment
    })
  }

  getReplies (commentID, opts) {
    return this.getEntries('replies', Object.assign({
      filters: {commentid: commentID}
    }, opts))
  }

  postReply (comment) {
    return this.saveEntry('replies', {
      commentid: comment.id,
      uid: this.getLoggedUserId(),
      content: comment.reply
    })
  }

  getFeedback (comment) {
    return this.getEntries('commentfeedbacks', {
      filters: {
        commentid: comment.id,
        uid: this.getLoggedUserId()
      },
      page: 1,
      perPage: 1
    })
  }

  deleteCommentFeedback (comment) {
    return this.deleteEntry('commentfeedbacks', comment.feedback.id)
  }

  postCommentFeedback (comment, value) {
    return this.saveEntry('commentfeedbacks', {
      value,
      commentid: comment.id,
      uid: this.getLoggedUserId()
    })
  }
}

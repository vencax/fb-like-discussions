import { action, extendObservable, transaction } from 'mobx'

export default (BaseClass) => class ReplyFeedbacksState extends BaseClass {

  @action upvote(reply) {
    if(reply.feedback && reply.feedback.feedback === -1) {
      this.requester.deleteEntry('replyfeedbacks', reply.feedback.id).then(() => {
        reply.feedback = null
        reply.rating = reply.rating + 1
      })
    } else if(reply.feedback === null) {
      this.requester.saveEntry('replyfeedbacks', {
        feedback: 1,
        replyid: reply.id,
        uid: this.getLoggedUserId()
      }).then((result) => {
        reply.feedback = result
        reply.rating = reply.rating + 1
      })
    }
  }

  @action downvote(reply) {
    if(reply.feedback && reply.feedback.feedback === 1) {
      this.requester.deleteEntry('replyfeedbacks', reply.feedback.id).then(() => {
        reply.feedback = null
        reply.rating = reply.rating - 1
      })
    } else if(reply.feedback === null) {
      this.requester.saveEntry('replyfeedbacks', {
        feedback: -1,
        replyid: reply.id,
        uid: this.getLoggedUserId()
      }).then((result) => {
        reply.feedback = result
        reply.rating = reply.rating - 1
      })
    }
  }

  loadReplyFeedbacks(replies) {
    replies.map((reply) => {
      this.requester.getEntries('replyfeedbacks', {
        filters: {
          replyid: reply.id,
          uid: this.getLoggedUserId()
        },
        page: 1,
        perPage: 1
      })
      .then((result) => {
        if(result.data.length > 0) {
          reply.feedback = result.data[0]
        }
      })
    })
  }

}

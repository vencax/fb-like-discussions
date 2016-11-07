import { action, extendObservable, transaction } from 'mobx'

export default (BaseClass) => class RepliesState extends BaseClass {

  @action loadReplies(state, discussion) {
    if(state.shownDiscussion) {
      state.shownDiscussion.replies = []  // delete current
    }
    this.requester.getEntries('replies', {
      filters: {parent: discussion.id},
      page: 1,
      perPage: 5
    })
    .then((result) => {
      transaction(() => {
        result.data.map((i) => i.feedback = null)
        discussion.replies = result.data
        extendObservable(state, {
          shownDiscussion: discussion,
          totalReplies: result.totalItems
        })
      })
      this._loadReplyFeedbacks(discussion.replies)
    })
  }

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

  @action composeReply(discussion) {
    discussion.reply = ''
  }

  @action sendReply(discussion) {
    this.requester.saveEntry('replies', {
      parent: discussion.id,
      author: "frodo@shire.nz",
      body: discussion.reply
    }).then((data) => {
      discussion.replies.push(data)
      discussion.reply = null
    })
  }

  @action updateReply(discussion, val) {
    discussion.reply = val
  }

  _loadReplyFeedbacks(replies) {
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

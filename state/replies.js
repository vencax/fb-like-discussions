import { action, extendObservable, transaction } from 'mobx'
import ReplyFeedbacksStateInit from './replyfeedbacks'

export default (BaseClass) => class RepliesState extends ReplyFeedbacksStateInit(BaseClass) {

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
      this.loadReplyFeedbacks(discussion.replies)
    })
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

}

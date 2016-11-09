import { action, extendObservable, transaction } from 'mobx'
import CommentFeedbacksStateInit from './commentfeedbacks'

export default (BaseClass) => class CommentsState extends CommentFeedbacksStateInit(BaseClass) {

  @action loadComments(state, discussion) {
    if(state.shownDiscussion) {
      state.shownDiscussion.comments = []  // delete current
    }
    this.requester.getEntries('comments', {
      filters: {parent: discussion.id},
      page: 1,
      perPage: 5
    })
    .then((result) => {
      transaction(() => {
        result.data.map((i) => i.feedback = null)
        discussion.comments = result.data
        extendObservable(state, {
          shownDiscussion: discussion,
          totalComments: result.totalItems
        })
      })
      this.loadCommentFeedbacks(discussion.comments)
    })
  }

  @action composeComment(discussion) {
    discussion.comment = ''
  }

  @action sendComment(discussion) {
    this.requester.saveEntry('comments', {
      parent: discussion.id,
      author: "frodo@shire.nz",
      body: discussion.comment
    }).then((data) => {
      discussion.comments.push(data)
      discussion.comment = null
    })
  }

  @action updateComment(discussion, val) {
    discussion.comment = val
  }

}

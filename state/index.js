import { action, extendObservable } from 'mobx'
import CommentsStateInit from './comments'

export default (BaseClass) => (

  class DiscussionsState extends CommentsStateInit(BaseClass) {

    loadDiscussions (state, opts = {}) {
      return this.requester.getDiscussions(opts).then((result) => {
        result.data.map((discussion) => {
          discussion.comments = []
          discussion.comment = null
        })
        extendObservable(state, {
          discussions: result.data,
          totalDiscusions: result.totalItems
        })
      })
    }

    loadDiscussion (state, id, opts = {}) {
      const _onDone = action('onDiscussionLoaded', (discussion) => {
        discussion.comments = []
        discussion.comment = ''
        state.discussion = discussion
        this.loadComments(state, state.discussion, {page: 1, perPage: this.commentPageSize})
      })
      return this.requester.getDiscussion(id).then(_onDone)
    }

  }

)

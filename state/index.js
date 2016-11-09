import { action, extendObservable } from 'mobx'
import CommentsStateInit from './comments'

export default (BaseClass) => (

  class DiscussionsState extends CommentsStateInit(BaseClass) {

    loadDiscussions(state, opts = {}) {
      this.requester.getEntries('discussions', {
        page: opts.page || 1,
        perPage: opts.perPage || 10
      }).then((result) => {
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

  }

)

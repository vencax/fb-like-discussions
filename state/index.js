import { action, extendObservable } from 'mobx'
import RepliesStateInit from './replies'

export default (BaseClass) => (

  class DiscussionsState extends RepliesStateInit(BaseClass) {

    loadDiscussions(state, opts = {}) {
      this.requester.getEntries('discussions', {
        page: opts.page || 1,
        perPage: opts.perPage || 10
      }).then((result) => {
        result.data.map((discussion) => {
          discussion.replies = []
          discussion.reply = null
        })
        extendObservable(state, {
          discussions: result.data,
          totalDiscusions: result.totalItems
        })
      })
    }
    
  }

)

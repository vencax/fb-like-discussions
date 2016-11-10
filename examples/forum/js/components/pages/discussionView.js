import React from 'react'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

@observer
class DiscussionsView extends React.Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    const { state } = this.props
    return state.currentView.discussion === null ? <span>loading</span> : (
      <Discussion discussion={state.currentView.discussion} state={state}
        onLoadComments={()=>state.loadComments(state.currentView, state.currentView.discussion)}
        showCommentForm={(show)=>state.composeComment(state.currentView.discussion, show)}
        onCommentChange={(newVal)=>state.updateComment(state.currentView.discussion, newVal)}
        onSendComment={()=>state.sendComment(state.currentView.discussion)}
        onLoadReplies={(comment)=>state.loadReplies(state.currentView, comment)}
      />
    )
  }

}
export default DiscussionsView

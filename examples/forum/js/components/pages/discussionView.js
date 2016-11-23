import React from 'react'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

const DiscussionView = ({ state }) => {
  const cv = state.currentView

  return cv.discussion === null ? <span>loading</span> : (
    <Discussion discussion={cv.discussion} state={state}
      onLoadComments={()=>state.loadComments(cv, cv.discussion)}
      showCommentForm={(show)=>state.composeComment(cv.discussion, show)}
      onCommentChange={(newVal)=>state.updateComment(cv.discussion, newVal)}
      onSendComment={()=>state.sendComment(cv.discussion)}
      onLoadReplies={(comment)=>state.loadReplies(cv, comment)}
    />
  )
}
DiscussionView.propTypes = {
  state: React.PropTypes.object.isRequired
}
export default observer(DiscussionView)

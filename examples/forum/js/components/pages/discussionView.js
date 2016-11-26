import React from 'react'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

const DiscussionView = ({ state }) => {
  const cv = state.currentView

  return cv.discussion === null ? <span>loading</span> : (
    <Discussion discussion={cv.discussion} state={state}
      onLoadComments={(page=1)=>state.loadComments(cv, cv.discussion, page)}
      showCommentForm={(show)=>state.composeComment(cv.discussion, show)}
      onCommentChange={(newVal)=>state.updateComment(cv.discussion, newVal)}
      onSendComment={()=>state.sendComment(cv.discussion)}
      onLoadReplies={(comment, page=1)=>state.loadReplies(cv, comment, page)}
    />
  )
}
DiscussionView.propTypes = {
  state: React.PropTypes.object.isRequired
}
export default observer(DiscussionView)

import React from 'react'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

const DiscussionsView = ({ state }) => (
  state.currentView.discussions.length ? (
    <ul className="comments-list">
      { state.currentView.discussions.map((dis, idx) => {
        return (<li key={idx}>
          <Discussion discussion={dis} state={state}
            onLoadComments={()=>state.loadComments(state.currentView, dis)}
            showCommentForm={(show)=>state.composeComment(dis, show)}
            onCommentChange={(newVal)=>state.updateComment(dis, newVal)}
            onSendComment={()=>state.sendComment(dis)}
            onLoadReplies={(comment)=>state.loadReplies(state.currentView, comment)} />
        </li>)
      })}
    </ul>
  ) : <span>loading</span>
)
DiscussionsView.propTypes = {
  state: React.PropTypes.object.isRequired
}
export default observer(DiscussionsView)

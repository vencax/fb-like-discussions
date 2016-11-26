import React from 'react'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

const DiscussionsView = ({ state }) => (
  state.currentView.discussions.length ? (
    <ul className="comments-list">
      { state.currentView.discussions.map((dis, idx) => {
        return (<li key={idx}>
          <Discussion discussion={dis} state={state}
            onLoadComments={(page=1)=>state.loadComments(state.currentView, dis, page)}
            showCommentForm={(show)=>state.composeComment(dis, show)}
            onCommentChange={(newVal)=>state.updateComment(dis, newVal)}
            onSendComment={()=>state.sendComment(dis)}
            onLoadReplies={(comment, page)=>state.loadReplies(state.currentView, comment, page)} />
        </li>)
      })}
    </ul>
  ) : <span>loading</span>
)
DiscussionsView.propTypes = {
  state: React.PropTypes.object.isRequired
}
export default observer(DiscussionsView)

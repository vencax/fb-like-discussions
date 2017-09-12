import React from 'react'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

const DefaultGravatar = ({user}) => (
  <img src='http://www.imran.com/xyper_images/icon-user-default.png' />
)

const DefaultHeading = ({record}) => (
  <span>{record.author} <span>{record.created}</span></span>
)

const DiscussionView = ({ state }) => {
  const cv = state.currentView
  const discussion = cv.discussion

  const loadButton = discussion && discussion.comments === null ? (
    <button onClick={(e)=>onLoadComments()}>load</button>
  ) : null

  return discussion === null ? <span>loading</span> : (
    <div>
      <h4>{discussion.title}</h4>
      <p>
        {discussion.created} | {discussion.author} | {discussion.comment_count} <i className="fa fa-comments" aria-hidden="true"></i> {loadButton}
      </p>
      <p dangerouslySetInnerHTML={{__html: discussion.body}} />
      <Discussion discussion={discussion} state={state}
        onLoadComments={(page=1)=>state.loadComments(cv, discussion, page)}
        showCommentForm={(show)=>state.composeComment(discussion, show)}
        onCommentChange={(newVal)=>state.updateComment(discussion, newVal)}
        onSendComment={()=>state.sendComment(discussion)}
        onLoadReplies={(comment, page=1)=>state.loadReplies(cv, comment, page)}
        Gravatar={DefaultGravatar} Heading={DefaultHeading}
      />
    </div>
  )
}
DiscussionView.propTypes = {
  state: React.PropTypes.object.isRequired
}
export default observer(DiscussionView)

import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

const DefaultGravatar = ({user}) => (
  <img src='http://www.imran.com/xyper_images/icon-user-default.png' />
)

const DefaultHeading = ({record}) => (
  <span><b>AuthorID{record.uid}</b> </span>
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
        onLoadComments={(page=1) => state.loadComments(cv, discussion, {page, perPage: 2})}
        onCommentChange={(newVal)=>state.updateComment(discussion, newVal)}
        onSendComment={()=>state.sendComment(discussion)}
        onLoadReplies={(comment, page=1)=>state.loadReplies(cv, comment, page)}
        onReply={state.onReply}
        Gravatar={DefaultGravatar} Heading={DefaultHeading}
        enabled={discussion.id === 1 || discussion.id === 3}
        feedbackable={discussion.id === 1}
      />
    </div>
  )
}
DiscussionView.propTypes = {
  state: PropTypes.object.isRequired
}
export default observer(DiscussionView)

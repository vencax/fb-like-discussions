import React from 'react'
import { observer } from 'mobx-react'
import Reply from './reply'

const Pagination = ({comment, onLoadReplies}) => {
  const showPrev = (comment.page > 1) &&
    (comment.totalReplies > comment.perPage)
  const lastPage = Math.round(comment.totalReplies / comment.perPage)
  const showNext = (comment.page < lastPage)
  return (
    <div>
      {showPrev ? <button type="button" className="btn btn-sm"
        onClick={(e)=>onLoadReplies(comment, comment.page - 1)}>prev</button> : null}
      {showNext ? <button type="button" className="btn btn-sm"
        onClick={(e)=>onLoadReplies(comment, comment.page + 1)}>next</button> : null}
    </div>
  )
}

Comment = ({
  comment, state,
  onLoadReplies, onReplyChange, onSendReply, showReplyForm
}) => {

  function renderReplyForm() {
    const showButton = (comment.reply_count > 0 || comment.replies.length > 0) &&
      comment.reply === null
    return showButton ? (
      <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>showReplyForm()}>reply</button>
    ) : (
      <div className="replyform">
        <textarea onChange={(e)=>onReplyChange(e.target.value)} value={comment.reply} />
        <button type="button" className="btn btn-sm" onClick={(e)=>onSendReply()}>send</button>
        <button type="button" className="btn btn-sm" onClick={(e)=>showReplyForm(false)}>cancel</button>
      </div>
    )
  }

  const replies = comment.replies.length ? (
    <div>
      { comment.replies.map((reply, idx) => {
        return (<Reply key={idx} reply={reply} state={state} />)
      }) }
      {renderReplyForm()}
    </div>
  ) : null
  const loadButton = comment.reply_count > 0 && comment.replies.length === 0 ? (
    <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>onLoadReplies(comment)}>
      load
    </button>
  ) : null

  return (
    <div className="media">
      <div className="media-left">
        <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" />
      </div>
      <div className="media-body">
        <h6 className="media-heading">
          {comment.author} <span>{comment.created}</span>
        </h6>
        <p dangerouslySetInnerHTML={{__html: comment.body}} />
        <div><i className="fa fa-comments" aria-hidden="true"></i> {comment.reply_count} replies {loadButton}</div>
        <CommentFeedback comment={comment} state={state} />
        {replies}
        <Pagination comment={comment} onLoadReplies={onLoadReplies} />
      </div>
    </div>
  )
}
Comment.propTypes = {
  comment: React.PropTypes.object.isRequired,
  state: React.PropTypes.object.isRequired,
  onLoadReplies: React.PropTypes.func.isRequired,
  showReplyForm: React.PropTypes.func.isRequired,
  onReplyChange: React.PropTypes.func.isRequired,
  onSendReply: React.PropTypes.func.isRequired
}
export default observer(Comment)

const _CommentFeedback = ({ comment, state }) => {
  return (
    <span className="commentfeedback">
      <button type="button" className="btn btn-sm"
        disabled={comment.feedback && comment.feedback.feedback === 1}
        onClick={(e)=>state.upvote(comment)}>
        {comment.upvotes} <i className="fa fa-thumbs-o-up"></i>
      </button>

      <button type="button" className="btn btn-sm"
        disabled={comment.feedback && comment.feedback.feedback === -1}
        onClick={(e)=>state.downvote(comment)}>
        {comment.downvotes} <i className="fa fa-thumbs-o-down"></i>
      </button>
    </span>
  )
}
const CommentFeedback = observer(_CommentFeedback)

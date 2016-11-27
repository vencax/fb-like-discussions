import React from 'react'
import { observer } from 'mobx-react'
import Comment from './comment'

const Pagination = ({discussion, onLoadComments}) => {
  const showPrev = (discussion.page > 1) &&
    (discussion.totalComments > discussion.perPage)
  const lastPage = Math.round(discussion.totalComments / discussion.perPage)
  const showNext = (discussion.page < lastPage)
  return (
    <div className="pull-right">
      {showPrev ? <button type="button" className="btn btn-sm"
        onClick={(e)=>onLoadComments(discussion.page - 1)}>prev</button> : null}
      {showNext ? <button type="button" className="btn btn-sm"
        onClick={(e)=>onLoadComments(discussion.page + 1)}>next</button> : null}
    </div>
  )
}

const Discussion = ({
  discussion, state, onLoadComments, onLoadReplies,
  onCommentChange, onSendComment, showCommentForm
}) => {

  const comparator = (a, b) => {
    return (a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)
  }

  const showCommentButton = (discussion.comment_count === 0 || discussion.comments.length > 0) &&
    discussion.comment === null
  const commentButton = showCommentButton ? (
    <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>showCommentForm()}>comment</button>
  ) : null

  const comments = discussion.comments.length ? (
    <div className="comments-list">
      { discussion.comments.sort(comparator).map((comment, idx) => (
        <Comment key={idx} comment={comment} state={state}
          onLoadReplies={onLoadReplies}
          showReplyForm={(show)=>state.composeReply(comment, show)}
          onReplyChange={(newVal)=>state.updateReply(comment, newVal)}
          onSendReply={()=>state.sendReply(comment)} />
      )) }
    </div>
  ) : null
  const loadButton = discussion.comments === null ? (
    <button onClick={(e)=>onLoadComments()}>load</button>
  ) : null
  const commentForm = discussion.comment !== null ? (
    <form>
      <div className="form-group">
        <textarea className="form-control" onChange={(e)=>onCommentChange(e.target.value)} value={discussion.comment} />
      </div>
      <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>onSendComment()}>send</button>
      <button type="button" className="btn btn-secondary btn-sm" onClick={(e)=>showCommentForm(false)}>cancel</button>
    </form>
  ) : null
  return (
    <div className="discussion">
      <h4>{discussion.title}</h4>
      <p>
        {discussion.created} | {discussion.author} | {discussion.comment_count} <i className="fa fa-comments" aria-hidden="true"></i> {loadButton}
      </p>
      <p dangerouslySetInnerHTML={{__html: discussion.body}} />
      {comments}
      <hr />
      <Pagination discussion={discussion} onLoadComments={onLoadComments} />
      {commentForm}
      {commentButton}
    </div>
  )
}
Discussion.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  state: React.PropTypes.object.isRequired,
  onLoadComments: React.PropTypes.func.isRequired,
  showCommentForm: React.PropTypes.func.isRequired,
  onCommentChange: React.PropTypes.func.isRequired,
  onSendComment: React.PropTypes.func.isRequired,
  onLoadReplies: React.PropTypes.func.isRequired
}
export default observer(Discussion)

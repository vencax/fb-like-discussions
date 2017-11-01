import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Comment from './comment'

const Pagination = ({discussion, onLoadComments}) => {
  const showPrev = (discussion.page > 1) &&
    (discussion.totalComments > discussion.perPage)
  const showNext = (discussion.page < discussion.lastPage)
  return (
    <div className='pull-right'>
      {showPrev ? <button type='button' className='btn btn-sm'
        onClick={(e) => onLoadComments(discussion.page - 1)}>prev</button> : null}
      {showNext ? <button type='button' className='btn btn-sm'
        onClick={(e) => onLoadComments(discussion.page + 1)}>next</button> : null}
    </div>
  )
}

const Discussion = ({
  discussion, state, onLoadComments, onLoadReplies,
  onCommentChange, onSendComment, showCommentForm,
  Gravatar, Heading
}) => {
  //
  const comparator = (a, b) => {
    return (a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)
  }

  const showCommentButton = discussion.comment === null
  const commentButton = showCommentButton ? (
    <button type='button' className='btn btn-primary btn-sm' onClick={(e) => showCommentForm()}>comment</button>
  ) : null

  const comments = discussion.comments.length ? (
    <div className='comments-list'>
      { discussion.comments.sort(comparator).map((comment, idx) => (
        <Comment key={idx} comment={comment} state={state}
          onLoadReplies={onLoadReplies}
          showReplyForm={(show) => state.composeReply(comment, show)}
          onReplyChange={(newVal) => state.updateReply(comment, newVal)}
          onSendReply={() => state.sendReply(discussion, comment)}
          Gravatar={Gravatar} Heading={Heading} />
      )) }
    </div>
  ) : null
  const commentForm = discussion.comment !== null ? (
    <form>
      <div className='form-group'>
        <textarea className='form-control' onChange={(e) => onCommentChange(e.target.value)} value={discussion.comment} />
      </div>
      <button type='button' className='btn btn-primary btn-sm' onClick={(e) => onSendComment()}>send</button>
      <button type='button' className='btn btn-secondary btn-sm' onClick={(e) => showCommentForm(false)}>cancel</button>
    </form>
  ) : null
  return (
    <div className='discussion'>
      {comments}
      <hr />
      <Pagination discussion={discussion} onLoadComments={onLoadComments} />
      {commentForm}
      {commentButton}
    </div>
  )
}
Discussion.propTypes = {
  discussion: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  showCommentForm: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onSendComment: PropTypes.func.isRequired,
  onLoadReplies: PropTypes.func.isRequired,
  Gravatar: PropTypes.func,
  Heading: PropTypes.func
}
export default observer(Discussion)

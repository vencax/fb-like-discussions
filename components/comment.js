import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Reply from './reply'

const Pagination = ({comment, onLoadReplies}) => {
  const showPrev = (comment.page > 1) &&
    (comment.totalReplies > comment.perPage)
  const showNext = (comment.page < comment.lastPage)
  return (
    <div className='pull-right'>
      {showPrev ? <button type='button' className='btn btn-sm'
        onClick={(e) => onLoadReplies(comment, comment.page - 1)}>prev</button> : null}
      {showNext ? <button type='button' className='btn btn-sm'
        onClick={(e) => onLoadReplies(comment, comment.page + 1)}>next</button> : null}
    </div>
  )
}

const Comment = ({
  comment, state,
  onLoadReplies, onReplyChange, onSendReply, showReplyForm,
  Gravatar, Heading
}) => {
  //
  function renderReplyForm () {
    if (comment.page && comment.page === comment.lastPage && comment.reply === null) {
      return (
        <button type='button' className='btn btn-primary btn-sm' onClick={(e) => showReplyForm()}>reply</button>
      )
    }
    if (comment.reply !== null) {
      return (
        <form>
          <div className='form-group'>
            <textarea className='form-control'
              onChange={(e) => onReplyChange(e.target.value)} value={comment.reply} />
          </div>
          <button type='button' className='btn btn-primary btn-sm' onClick={(e) => onSendReply()}>send</button>
        </form>
      )
    }
  }

  function _onLoadRepliesClick (e) {
    e.preventDefault()
    onLoadReplies(comment)
  }

  const replies = comment.reply_count > 0 && comment.replies.length === 0 ? (
    <a href='#' onClick={_onLoadRepliesClick}>
      <i className='fa fa-comments' aria-hidden='true'></i> {comment.reply_count} replies ..
    </a>
  ) : (
    <div style={{clear: 'both'}}>
      { comment.replies.map((reply, idx) => {
        return (<Reply key={idx} reply={reply} Gravatar={Gravatar} Heading={Heading} />)
      }) }
      {renderReplyForm()}
    </div>
  )

  return (
    <div className='media'>
      <div className='media-left'>
        <Gravatar user={comment.author} />
      </div>
      <div className='media-body'>
        <h6 className='media-heading'>
          <Heading record={comment} />
        </h6>
        <p dangerouslySetInnerHTML={{__html: comment.body}} />
        <CommentFeedback comment={comment} state={state} />
        {replies}
        <hr />
        <Pagination comment={comment} onLoadReplies={onLoadReplies} />
      </div>
    </div>
  )
}
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  onLoadReplies: PropTypes.func.isRequired,
  showReplyForm: PropTypes.func.isRequired,
  onReplyChange: PropTypes.func.isRequired,
  onSendReply: PropTypes.func.isRequired,
  Gravatar: PropTypes.func,
  Heading: PropTypes.func
}
export default observer(Comment)

const _CommentFeedback = ({ comment, state }) => {
  return (
    <div className='btn-group commentfeedback pull-right' role='group'>
      <button type='button' className='btn btn-sm'
        disabled={comment.feedback && comment.feedback.feedback === 1}
        onClick={(e) => state.upvote(comment)}>
        {comment.upvotes} <i className='fa fa-thumbs-o-up'></i>
      </button>

      <button type='button' className='btn btn-sm'
        disabled={comment.feedback && comment.feedback.feedback === -1}
        onClick={(e) => state.downvote(comment)}>
        {comment.downvotes} <i className='fa fa-thumbs-o-down'></i>
      </button>
    </div>
  )
}
const CommentFeedback = observer(_CommentFeedback)

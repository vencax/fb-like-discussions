import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Comment from './comment'

const Pagination = ({discussion, onLoadComments, __}) => {
  const showPrev = (discussion.page > 1) &&
    (discussion.totalComments > discussion.perPage)
  const showNext = (discussion.page < discussion.lastPage)
  return (
    <div className='pull-right'>
      {showPrev ? <button type='button' className='btn btn-sm'
        onClick={(e) => onLoadComments(discussion.page - 1)}>{__('prev')}</button> : null}
      {showNext ? <button type='button' className='btn btn-sm'
        onClick={(e) => onLoadComments(discussion.page + 1)}>{__('next')}</button> : null}
    </div>
  )
}

const _dentity = (v) => v

const Discussion = ({
  discussion, state, onLoadComments, onLoadReplies, onReply,
  onCommentChange, onSendComment, showCommentForm,
  Gravatar, Heading, enabled = true, feedbackable = true,
  __ = _dentity, formatDate = _dentity
}) => {
  //
  const comparator = (a, b) => {
    return (a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)
  }

  const commentForm = enabled && discussion.page === discussion.lastPage ? (
    <div className='media'>
      <div className='media-left'>
        <Gravatar user={null} />
      </div>
      <div className='media-body'>
        <form>
          <div className='form-group'>
            <textarea className='form-control' onChange={(e) => onCommentChange(e.target.value)} value={discussion.comment} />
          </div>
          <button type='button' className='btn btn-primary btn-sm' onClick={(e) => onSendComment()}>{__('send')}</button>
        </form>
      </div>
    </div>
  ) : null
  const comments = (
    <div className='comments-list'>
      {
        discussion.comments.length ? discussion.comments.sort(comparator).map((comment, idx) => (
          <Comment key={idx} comment={comment} state={state}
            onLoadReplies={onLoadReplies} onReply={onReply}
            onReplyChange={(newVal) => state.updateReply(comment, newVal)}
            onSendReply={() => state.sendReply(discussion, comment)}
            Gravatar={Gravatar} Heading={Heading}
            enabled={enabled} feedbackable={feedbackable}
            __={__} formatDate={formatDate} />
        )) : null
      }
      {commentForm}
    </div>
  )
  return (
    <div className='discussion'>
      {comments}
      <hr />
      <Pagination discussion={discussion} onLoadComments={onLoadComments} __={__} />
    </div>
  )
}
Discussion.propTypes = {
  discussion: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onSendComment: PropTypes.func.isRequired,
  onLoadReplies: PropTypes.func.isRequired,
  Gravatar: PropTypes.func,
  Heading: PropTypes.func
}
export default observer(Discussion)

import React from 'react'
import PropTypes from 'prop-types'

export const Reply = ({reply, onReply, Gravatar, Heading, enabled = true, __, formatDate}) => {
  const replR = enabled ? <span><ReplyButton onClick={onReply} __={__} /> · </span> : null
  return (
    <div className='media reply'>
      <div className='media-left'>
        <Gravatar user={reply.uid} />
      </div>
      <div className='media-body'>
        <span className='media-heading'>
          <Heading record={reply} />
        </span>
        <span dangerouslySetInnerHTML={{__html: reply.content}} />
        <div className='toolbar'>
          {replR}<span>{formatDate(reply.created)}</span>
        </div>
      </div>
    </div>
  )
}
Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  Gravatar: PropTypes.func,
  Heading: PropTypes.func
}

// -----------------------------------------------------------------------------

export const ReplyForm = ({comment, onChange, onSend, Gravatar, __}) => {
  return (
    <div className='media reply'>
      <div className='media-left'>
        <Gravatar user={null} />
      </div>
      <div className='media-body'>
        <form>
          <div className='form-group'>
            <textarea className='form-control'
              onChange={(e) => onChange(e.target.value)} value={comment.reply} />
          </div>
          <button type='button' className='btn btn-primary btn-sm' onClick={(e) => onSend()}>{__('send')}</button>
        </form>
      </div>
    </div>
  )
}

export const ReplyButton = ({onClick, __}) => (
  <button type='button' className='btn btn-primary btn-sm'
    onClick={(e) => onClick()}>{__('reply')}</button>
)

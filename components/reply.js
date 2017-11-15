import React from 'react'
import PropTypes from 'prop-types'

export const Reply = ({reply, Gravatar, Heading}) => (
  <div className='media'>
    <div className='media-left'>
      <Gravatar user={reply.uid} />
    </div>
    <div className='media-body'>
      <h6 className='media-heading'>
        <Heading record={reply} />
      </h6>
      <p dangerouslySetInnerHTML={{__html: reply.content}} />
    </div>
  </div>
)
Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  Gravatar: PropTypes.func,
  Heading: PropTypes.func
}

// -----------------------------------------------------------------------------

export const ReplyForm = ({comment, onChange, onSend, onCancel}) => {
  return (
    <form>
      <div className='form-group'>
        <textarea className='form-control'
          onChange={(e) => onChange(e.target.value)} value={comment.value} />
      </div>
      <button type='button' className='btn btn-primary btn-sm' onClick={(e) => onSend()}>send</button>
      <button type='button' className='btn btn-secondary btn-sm' onClick={(e) => onCancel(false)}>cancel</button>
    </form>
  )
}

import React from 'react'
import PropTypes from 'prop-types'

const Reply = ({reply, Gravatar, Heading}) => (
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
export default Reply

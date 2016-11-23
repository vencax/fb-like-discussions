import React from 'react'

const Reply = ({ reply, state }) => (
  <div className="media">
    <div className="media-left">
      <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" />
    </div>
    <div className="media-body">
      <h6 className="media-heading">
        {reply.author} <span>{reply.created}</span>
      </h6>
      <p dangerouslySetInnerHTML={{__html: reply.body}} />
    </div>
  </div>
)
Reply.propTypes = {
  reply: React.PropTypes.object.isRequired,
  state: React.PropTypes.object.isRequired
}
export default Reply

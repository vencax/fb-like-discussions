import React from 'react'
import { observer } from 'mobx-react'

export default class Reply extends React.Component {

  static propTypes = {
    reply: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired
  }

  render() {
    const { reply, state } = this.props
    return (
      <li>
        <div className="comment-avatar">
          <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" />
        </div>
        <div className="comment-box">
          <div className="comment-head">
            <h6 className="comment-name">{reply.author}</h6>
            <span>{reply.created}</span>
          </div>

          <div className="comment-content">
            <p dangerouslySetInnerHTML={{__html: reply.body}} />
          </div>
        </div>
      </li>
    )
  }

}

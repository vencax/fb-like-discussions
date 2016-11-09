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
      <div>
        <div className="replyHead">
          {reply.author} | {reply.created}
        </div>
        <p dangerouslySetInnerHTML={{__html: reply.body}} />
      </div>
    )
  }

}

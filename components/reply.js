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
          {reply.author} | {reply.created} | rating: {reply.rating} <ReplyFeedback {...this.props} />
        </div>
        <p dangerouslySetInnerHTML={{__html: reply.body}} />
      </div>
    )
  }

}

@observer
class ReplyFeedback extends React.Component {

  render() {
    const { reply, state } = this.props
    return (
      <div className="replyfeedback">
        <button disabled={reply.feedback && reply.feedback.feedback === 1}
          onClick={(e)=>state.upvote(reply)}>upvote</button>
        <button disabled={reply.feedback && reply.feedback.feedback === -1}
          onClick={(e)=>state.downvote(reply)}>downvote</button>
      </div>
    )
  }

}

import React from 'react'


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
          {reply.author} | {reply.created} | rating: {reply.rating}
          <button onClick={(e)=>state.upvote(reply)}>upvote</button>
          <button onClick={(e)=>state.downvote(reply)}>downvote</button>
        </div>
        <p dangerouslySetInnerHTML={{__html: reply.body}} />
      </div>
    )
  }

}

import React from 'react'
import { observer } from 'mobx-react'
import Reply from './reply'

@observer
class Comment extends React.Component {

  static propTypes = {
    comment: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    onLoadReplies: React.PropTypes.func.isRequired
  }

  renderReplies(replies) {
    return (
      <div style={{marginLeft: '3em'}}>
        { replies.map((reply, idx) => {
          return (<Reply key={idx} reply={reply} state={this.props.state} />)
        }) }
      </div>
    )
  }

  render() {
    const { comment, state, onLoadReplies } = this.props
    const replies = comment.replies.length ? this.renderReplies(comment.replies) : null
    const loadButton = comment.reply_count ? (
      <button onClick={(e)=>onLoadReplies(comment)}>
        {comment.reply_count} replies
      </button>
    ) : null
    return (
      <div>
        <div className="commentHead">
          {comment.author} | {comment.created} | rating: {comment.rating} <CommentFeedback {...this.props} />
          {loadButton}
        </div>
        <p dangerouslySetInnerHTML={{__html: comment.body}} />
        {replies}
      </div>
    )
  }

}
export default Comment

@observer
class CommentFeedback extends React.Component {

  render() {
    const { comment, state } = this.props
    return (
      <div className="commentfeedback">
        <button disabled={comment.feedback && comment.feedback.feedback === 1}
          onClick={(e)=>state.upvote(comment)}>upvote</button>
        <button disabled={comment.feedback && comment.feedback.feedback === -1}
          onClick={(e)=>state.downvote(comment)}>downvote</button>
      </div>
    )
  }

}

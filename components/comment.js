import React from 'react'
import { observer } from 'mobx-react'
import Reply from './reply'

@observer
class Comment extends React.Component {

  static propTypes = {
    comment: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    onLoadReplies: React.PropTypes.func.isRequired,
    showReplyForm: React.PropTypes.func.isRequired,
    onReplyChange: React.PropTypes.func.isRequired,
    onSendReply: React.PropTypes.func.isRequired
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

  renderReplyForm(comment) {
    const { onReplyChange, onSendReply, showReplyForm } = this.props
    const showButton = (comment.reply_count > 0 || comment.replies.length > 0) &&
      comment.reply === null
    return showButton ? (
      <button onClick={(e)=>showReplyForm()}>reply</button>
    ) : (
      <div className="replyform">
        <textarea onChange={(e)=>onReplyChange(e.target.value)} value={comment.reply} />
        <button onClick={(e)=>onSendReply()}>send</button>
        <button onClick={(e)=>showReplyForm(false)}>cancel</button>
      </div>
    )
  }

  render() {
    const { comment, state, onLoadReplies, showReplyForm } = this.props
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
        {this.renderReplyForm(comment)}
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

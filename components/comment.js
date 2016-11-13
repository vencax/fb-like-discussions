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

  renderReplies(comment) {
    return (
      <div>
        { comment.replies.map((reply, idx) => {
          return (<Reply key={idx} reply={reply} state={this.props.state} />)
        }) }
        {this.renderReplyForm(comment)}
      </div>
    )
  }

  renderReplyForm(comment) {
    const { onReplyChange, onSendReply, showReplyForm } = this.props
    const showButton = (comment.reply_count > 0 || comment.replies.length > 0) &&
      comment.reply === null
    return showButton ? (
      <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>showReplyForm()}>reply</button>
    ) : (
      <div className="replyform">
        <textarea onChange={(e)=>onReplyChange(e.target.value)} value={comment.reply} />
        <button type="button" className="btn btn-sm" onClick={(e)=>onSendReply()}>send</button>
        <button type="button" className="btn btn-sm" onClick={(e)=>showReplyForm(false)}>cancel</button>
      </div>
    )
  }

  render() {
    const { comment, state, onLoadReplies, showReplyForm } = this.props
    const replies = comment.replies.length ? this.renderReplies(comment) : null
    const loadButton = comment.reply_count ? (
      <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>onLoadReplies(comment)}>
        {comment.reply_count} replies
      </button>
    ) : null
    return (
      <div className="media">
        <div className="media-left">
          <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" />
        </div>
        <div className="media-body">
          <h6 className="media-heading">
            {comment.author} <span>{comment.created} | rating: {comment.rating}</span> <CommentFeedback {...this.props} /> {loadButton}
          </h6>
          <p dangerouslySetInnerHTML={{__html: comment.body}} />
          {replies}
        </div>
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
      <span className="commentfeedback">
        <button type="button" className="btn btn-sm" disabled={comment.feedback && comment.feedback.feedback === 1}
          onClick={(e)=>state.upvote(comment)}>upvote</button>
        <button type="button" className="btn btn-sm" disabled={comment.feedback && comment.feedback.feedback === -1}
          onClick={(e)=>state.downvote(comment)}>downvote</button>
      </span>
    )
  }

}

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
      <ul className="comments-list reply-list">
        { replies.map((reply, idx) => {
          return (<Reply key={idx} reply={reply} state={this.props.state} />)
        }) }
      </ul>
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
        <button type="button" className="btn btn-sm" onClick={(e)=>onSendReply()}>send</button>
        <button type="button" className="btn btn-sm" onClick={(e)=>showReplyForm(false)}>cancel</button>
      </div>
    )
  }

  render() {
    const { comment, state, onLoadReplies, showReplyForm } = this.props
    const replies = comment.replies.length ? this.renderReplies(comment.replies) : null
    const loadButton = comment.reply_count ? (
      <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>onLoadReplies(comment)}>
        {comment.reply_count} replies
      </button>
    ) : null
    return (
      <div>
        <div className="comment-main-level">
          <div className="comment-avatar">
            <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" />
          </div>
          <div className="comment-box">
            <div className="comment-head">
              <h6 className="comment-name by-author">{comment.author}</h6>
              <span>{comment.created} | rating: {comment.rating}</span> <CommentFeedback {...this.props} /> {loadButton}
            </div>
            <div className="comment-content">
              <p dangerouslySetInnerHTML={{__html: comment.body}} />
            </div>
          </div>
        </div>
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
        <button type="button" className="btn btn-sm" disabled={comment.feedback && comment.feedback.feedback === 1}
          onClick={(e)=>state.upvote(comment)}>upvote</button>
        <button type="button" className="btn btn-sm" disabled={comment.feedback && comment.feedback.feedback === -1}
          onClick={(e)=>state.downvote(comment)}>downvote</button>
      </div>
    )
  }

}

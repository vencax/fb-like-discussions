import React from 'react'
import { observer } from 'mobx-react'
import Comment from './comment'

@observer
class Discussion extends React.Component {

  static propTypes = {
    discussion: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    onLoadComments: React.PropTypes.func.isRequired,
    showCommentForm: React.PropTypes.func.isRequired,
    onCommentChange: React.PropTypes.func.isRequired,
    onSendComment: React.PropTypes.func.isRequired,
    onLoadReplies: React.PropTypes.func.isRequired
  }

  renderComments(comments, state) {
    const comparator = (a, b) => {
      return (a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)
    }
    return (
      <div className="comments-list">
        { comments.sort(comparator).map((comment, idx) => (
          <Comment key={idx} comment={comment} state={state}
            onLoadReplies={this.props.onLoadReplies}
            showReplyForm={(show)=>state.composeReply(comment, show)}
            onReplyChange={(newVal)=>state.updateReply(comment, newVal)}
            onSendReply={()=>state.sendReply(comment)} />
        )) }
      </div>
    )
  }

  renderCommentForm(discussion) {
    const { onCommentChange, onSendComment, showCommentForm } = this.props
    return (
      <form>
        <div className="form-group">
          <textarea className="form-control" onChange={(e)=>onCommentChange(e.target.value)} value={discussion.comment} />
        </div>
        <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>onSendComment()}>send</button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={(e)=>showCommentForm(false)}>cancel</button>
      </form>
    )
  }

  _renderCommentButton(discussion, showCommentForm) {
    const show = (discussion.comment_count === 0 || discussion.comments.length > 0) &&
      discussion.comment === null
    return show ? (
      <button type="button" className="btn btn-primary btn-sm" onClick={(e)=>showCommentForm()}>comment</button>
    ) : null
  }

  render() {
    const { discussion, state, onLoadComments, showCommentForm } = this.props
    const comments = discussion.comments.length ? this.renderComments(discussion.comments, state) : null
    const loadButton = discussion.comments === null ? (
      <button onClick={(e)=>onLoadComments()}>load</button>
    ) : null
    const commentForm = discussion.comment !== null ?
      this.renderCommentForm(discussion) : null
    return (
      <div className="discussion">
        <h4>{discussion.title}</h4>
        <p>
          {discussion.created} | {discussion.author} | {discussion.comment_count} <i className="fa fa-comments" aria-hidden="true"></i> {loadButton}
        </p>
        <p dangerouslySetInnerHTML={{__html: discussion.body}} />
        {comments}
        {commentForm}
        {this._renderCommentButton(discussion, showCommentForm)}
      </div>
    )
  }

}
export default Discussion

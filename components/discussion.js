import React from 'react'
import { observer } from 'mobx-react'
import Reply from './reply'

@observer
class Discussion extends React.Component {

  static propTypes = {
    discussion: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    onLoadReplies: React.PropTypes.func.isRequired,
    onReply: React.PropTypes.func.isRequired,
    onReplyChange: React.PropTypes.func.isRequired,
    onSendReply: React.PropTypes.func.isRequired
  }

  renderReplies(replies) {
    const comparator = (a, b) => {
      return a.rating < b.rating
    }
    return (
      <div style={{marginLeft: '3em'}}>
        { replies.sort(comparator).map((reply, idx) => {
          return (<Reply key={idx} reply={reply} state={this.props.state} />)
        }) }
      </div>
    )
  }

  renderReplyForm(discussion) {
    const { onReplyChange, onSendReply } = this.props
    return (
      <div className="replyform">
        <textarea onChange={(e)=>onReplyChange(e.target.value)} value={discussion.reply} />
        <button onClick={(e)=>onSendReply()}>send</button>
      </div>
    )
  }

  render() {
    const { discussion, state, onLoadReplies, onReply } = this.props
    const replies = discussion.replies.length ? this.renderReplies(discussion.replies) : null
    const loadButton = discussion.reply_count ? (
      <button onClick={(e)=>onLoadReplies()}>
        {discussion.reply_count} replies
      </button>
    ) : null
    const replyForm = discussion.reply !== null ?
      this.renderReplyForm(discussion) : null
    const replyButton = (discussion.reply_count === 0 || discussion.replies.length > 0) ?
      (<button onClick={(e)=>onReply()}>reply</button>) : null
    return (
      <div className="discussion">
        <h4>{discussion.title}</h4>
        <p>
          {discussion.created} | {discussion.author} | {loadButton}
        </p>
        <p dangerouslySetInnerHTML={{__html: discussion.body}} />
        {replies}
        {replyForm}
        {replyButton}
      </div>
    )
  }

}
export default Discussion

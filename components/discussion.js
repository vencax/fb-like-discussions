import React from 'react'
import { observer } from 'mobx-react'
import Reply from './reply'

@observer
class Discussion extends React.Component {

  static propTypes = {
    discussion: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired
  }

  thisRenderReplies(replies) {
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

  render() {
    const { discussion, state } = this.props
    const replies = discussion.replies.length ? this.thisRenderReplies(discussion.replies) : null
    return (
      <div className="discussion">
        <h4>{discussion.title}</h4>
        <p>
          {discussion.created} | {discussion.author} |
          <button onClick={(e)=>state.loadReplies(discussion)}>
            {discussion.reply_count} replies
          </button>
        </p>
        <p dangerouslySetInnerHTML={{__html: discussion.body}} />
        {replies}
      </div>
    )
  }

}
export default Discussion

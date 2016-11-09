import React from 'react'
import { observer } from 'mobx-react'

export default class Comment extends React.Component {

  static propTypes = {
    comment: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired
  }

  render() {
    const { comment, state } = this.props
    return (
      <div>
        <div className="commentHead">
          {comment.author} | {comment.created} | rating: {comment.rating} <CommentFeedback {...this.props} />
        </div>
        <p dangerouslySetInnerHTML={{__html: comment.body}} />
      </div>
    )
  }

}

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

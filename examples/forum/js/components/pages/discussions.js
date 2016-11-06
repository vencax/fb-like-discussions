import React from 'react'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

@observer
class DiscussionsView extends React.Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    const { state } = this.props
    return state.currentView.discussions.length ? (
      <ul>
        { state.currentView.discussions.map((dis, idx) => {
          return (<li key={idx}>
            <Discussion discussion={dis} state={state}
              onLoadReplies={()=>state.loadReplies(state.currentView, dis)}
              onReply={()=>state.composeReply(dis)}
              onReplyChange={(newVal)=>state.updateReply(dis, newVal)}
              onSendReply={()=>state.sendReply(dis)} />
          </li>)
        })}
      </ul>
    ) : <span>loading</span>
  }

}
export default DiscussionsView

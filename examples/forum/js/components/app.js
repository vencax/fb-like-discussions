import React from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'


export const App = observer( ({ state }) => {
  return (
    <div>
      { renderCurrentView(state) }
      <DevTools />
    </div>
  )
})

import DiscussionsView from './pages/discussions'
import SingleDiscussionView from './pages/discussionView'
import LoginPage from './pages/login'

function renderCurrentView(state) {
  const viewName = state.currentView ? state.currentView.name : 'login'
  switch (viewName) {
    case 'login': return <LoginPage state={state} afterLogin={()=>store.showDiscussions()} />
    case 'discussions': return <DiscussionsView state={state} />
    case 'singlediscussion': return <SingleDiscussionView state={state} />
  }
}

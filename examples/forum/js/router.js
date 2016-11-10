import { createHistory } from 'history'
import { autorun } from 'mobx'

export function startRouter(store) {

  // update state on url change ---------------
  page('/discussions', (ctx) => store.showDiscussions())
  page('/discussion/:id', (ctx) => store.showDiscussion(ctx.params.id))
  page('/login', (ctx) => store.showLogin())
  page('*', (ctx) => store.showDiscussions())
  page()

  // update url on state changes ---------------
  autorun(() => {
    const path = store.currentPath
    if (path !== window.location.pathname) {
      window.history.pushState(null, null, path)
    }
  })

}

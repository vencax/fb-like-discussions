import { createHistory } from 'history'
import { autorun } from 'mobx'

export function startRouter(store) {

  // update state on url change ---------------
  page('/discussions', (ctx) => store.showDiscussions())
  page('/discussions/:id', (ctx) => {
    const id = ctx.params.id !== '_new' ? ctx.params.id : undefined
    store.showEntityDetail(ctx.params.entityName, id)
  })
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

import { observable, action, computed, asMap } from 'mobx'

export default class BaseState {

  constructor(requester) {
    this.requester = requester
    this.commentPageSize = 2
    this.replyPageSize = 2
  }

  @observable currentView = null

  initView(name, data = {}) {
    data.name = name
    this.currentView = data
  }

  @observable messages = asMap({})

  @action addMessage(text, type, timeout = 0) {
    const message = {text, type, timeout}
    this.messages.set(text, message)
    if(timeout > 0) {
      function _remove() {
        this.messages.delete(text)
      }
      setTimeout(_remove.bind(this), timeout)
    }
    return message
  }

  @action removeMessage(message) {
    this.messages.delete(message.text)
  }

  @computed get cv() {
    return this.currentView
  }

}

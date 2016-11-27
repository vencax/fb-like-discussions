
export default class MockRequester {

  data = null

  getEntries(entityName, params) {
    return new Promise((resolve, reject) => {
      resolve({data: this.data, totalItems: 3})
    })
  }

  getEntry(entityName, id, options={}) {
    return new Promise((resolve, reject) => {
      this.id = id
      this.entityName = entityName
      resolve(this.data)
    })
  }

  deleteEntry(entityName, id) {
    return new Promise((resolve, reject) => {
      this.id = id
      this.entityName = entityName
      resolve(this.data)
    })
  }

  saveEntry(entityName, data, id=null) {
    return new Promise((resolve, reject) => {
      this.data = Object.assign({}, data)
      this.id = id
      this.entityName = entityName
      resolve(data)
    })
  }

  call(url, method = 'get', data) {   // call our API
    return new Promise((resolve, reject) => {
      this.url = url
      this.method = method
      this.data = Object.assign({}, data)
      resolve(this.data)
    })
  }

  callExternalRes(conf) {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }
}

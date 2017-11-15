import axios from 'axios'
import { convertQuery, getTotalItems } from './api_flavor'
import DiscussRequesterInit from './discuss'

class DataRequester {

  constructor(apiUrl) {
    this.apiUrl = apiUrl
    this.convertQuery = convertQuery
    this.getTotalItems = getTotalItems
    this.authHeaders = {}
  }

  setDefaultHeaders(defHeaders) {
    for(let key in defHeaders) {
      axios.defaults.headers.common[key] = defHeaders[key]
    }
  }

  setAuth(headers) {
    this.authHeaders = headers
  }

  getEntries(entityName, params) {

    let qParams = this.convertQuery(params)

    const req = axios({
      method: 'get',
      url: `${this.apiUrl}/${entityName}`,
      params: qParams,
      headers: this.authHeaders
    })

    return req.then((response) => {
      return {
        data: response.data,
        totalItems: this.getTotalItems(response)
      }
    })

  }

  getEntry(entityName, id, options={}) {
    return axios({
      method: 'get',
      url: `${this.apiUrl}/${entityName}/${id}`,
      headers: this.authHeaders
    }).then((response) => {
      return response.data
    })
  }

  deleteEntry(entityName, id) {
    return axios({
      method: 'delete',
      url: `${this.apiUrl}/${entityName}/${id}`,
      headers: this.authHeaders
    })
  }

  saveEntry(entityName, data, id=null) {
    const conf = {
      headers: this.authHeaders,
      data: data
    }

    if (id) {
      conf.url = `${this.apiUrl}/${entityName}/${id}`
      conf.method = 'put'
    } else {
      conf.url = `${this.apiUrl}/${entityName}`
      conf.method = 'post'
    }
    return axios(conf).then((response) => {
      return response.data
    })
  }

  call(url, method = 'get', data) {   // call our API
    return axios({
      method: method,
      url: `${this.apiUrl}${url}`,
      headers: this.authHeaders,
      data: data
    })
  }

  callExternalRes(conf) {   // just to be able to call external API
    return axios(conf)
  }

  getDiscussions (opts) {
    const qpars = {
      page: opts.page || 1,
      perPage: opts.perPage || 10
    }
    return axios({
      method: 'get',
      url: `${this.apiUrl}/discussions`,
      headers: this.authHeaders
    })
  }

  getDiscussion (id) {
    const qpars = {
      page: opts.page || 1,
      perPage: opts.perPage || 10
    }
    return axios({
      method: 'get',
      url: `${this.apiUrl}/discussions`,
      headers: this.authHeaders
    })
  }

  getComments (discussionID, opts = {page: 1}) {
    return this.getEntries('comments', Object.assign({}, {
      filters: {parent: discussionID},
      perPage: this.commentPageSize || 10
    }, opts))
  }

  postComment (data) {
    return this.saveEntry('comments', data)
  }

  getReplies (commentID) {
    return this.getEntries('replies', {filters: {commentid: commentID}})
  }
}

export default DiscussRequesterInit(DataRequester)

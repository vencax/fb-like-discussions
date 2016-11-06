import React from 'react'
import { render } from 'react-dom'
import { startRouter } from './router'

// create requester
import DataRequester from './services/requester'
const _requester = new DataRequester(Conf.apiUrl)

// use it to create the app state
import StateStore from './state'
const state = new StateStore(_requester)
startRouter(state)

// init react components part using the only prop: the store
import { App } from './components/app'
const mount = document.getElementById("app")  // mountpoint
render(<App state={state} />, mount)  // and final render

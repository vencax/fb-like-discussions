import React from 'react'
import { observer } from 'mobx-react'

const LoginView = ({state, afterLogin}) => {

  function handleSubmit() {
    state.submitted = true
    return state.performLogin(toJS(state.credentials))
    .then((user) => {
      afterLogin()
    })
    .catch((err)=>{
      state.submitted = false
    })
  }

  return (
    <button onClick={()=>handleSubmit()}>login</button>
  )
}
LoginView.propTypes = {
  state: React.PropTypes.object.isRequired,
  afterLogin: React.PropTypes.func.isRequired
}
export default observer(LoginView)

import React from 'react'
import { observer } from 'mobx-react'

@observer
class LoginView extends React.Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired,
    afterLogin: React.PropTypes.func.isRequired
  }

  handleSubmit() {
    this.submitted = true
    return this.props.state.performLogin(toJS(this.credentials))
    .then((user) => {
      this.props.afterLogin()
    })
    .catch((err)=>{
      this.submitted = false
    })
  }

  render() {
    return (
      <button onClick={()=>this.handleSubmit()}>login</button>
    )
  }

}
export default LoginView

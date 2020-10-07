import React from 'react'
import { withRouter } from 'react-router-dom'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../utils/api'
import axios from 'axios'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  componentDidMount () {
    axios.get(API_BASE_URL + '/user/me',
      { headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) } })
      .then( (res) =>{
          if (res.data.code === 200) {
            this.setState(prevState => ({
              ...prevState,
              email: res.data.data
            }));
          }
        }
      )
      .catch( () => {
          this.redirectToLogin();
      });
  }

  redirectToLogin () {
    this.props.history.push('/login')
  }

  render () {
    return (
      <div className="mt-2">
        <h1>Home page content</h1>
        <h2>user email:{this.state.email}</h2>
      </div>
    )
  }
}

export default withRouter(Home)

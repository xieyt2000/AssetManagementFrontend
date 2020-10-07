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

  async componentDidMount () {
    // axios.get(API_BASE_URL + '/user/me',
    //   { headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) } })
    //   .then(function (response) {
    //     console.log(response)
    //     if (response.status !== 200) {
    //       //redirectToLogin()
    //     }
    //     this.setState(prevState => ({
    //       ...prevState,
    //       email: response.data.data
    //     }))
    //   })
    //   .catch(function (error) {
    //     //redirectToLogin()
    //     console.log(error)
    //   })
    const res = await axios.get(API_BASE_URL + '/user/me',
      { headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) } })
    if (res.data.code === 200) {
      this.setState(prevState => ({
        ...prevState,
        email: res.data.data
      }))
    }
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

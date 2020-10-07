import React, { useEffect, useState } from 'react'
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

  componentDidUpdate (prevProps, prevState, snapshot) {
    axios.get(API_BASE_URL + '/user/me',
      { headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) } })
      .then(function (response) {
        if (response.status !== 200) {
          //redirectToLogin()
        }
        this.setState(prevState => ({
          ...prevState,
          email: response.data.email
        }))
      })
      .catch(function (error) {
        //redirectToLogin()
        console.log(error)
      })

  }

  redirectToLogin () {
    this.props.history.push('/login')
  }

  render () {
    return (
      <div className="mt-2">
        <h1>Home page content</h1>
        <h2>{this.state.email}</h2>
      </div>
    )
  }
}

export default withRouter(Home)

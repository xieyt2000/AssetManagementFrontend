import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/actions'
import Layout from '@/views/layout'
import Login from '@/views/login'
import PropTypes from 'prop-types'
import { removeToken } from '../utils/auth'

class Router extends React.Component {
  render () {
    const { token, role, getUserInfo: getInfo } = this.props
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route
            path="/"
            render={() => {
              if (!token) {
                return <Redirect to="/login"/>
              } else {
                if (role.length >= 1) {
                  return <Layout/>
                } else {
                  getInfo(token)
                    .then(() => <Layout/>)
                    .catch(() => {
                      removeToken()
                      return <Redirect to="/login"/>
                    })
                }
              }
            }}
          />
        </Switch>
      </HashRouter>
    )
  }
}

Router.propTypes = {
  token: PropTypes.string,
  role: PropTypes.array,
  getUserInfo: PropTypes.func
}
export default connect((state) => state.user, { getUserInfo })(Router)

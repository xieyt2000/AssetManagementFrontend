import React, { useState } from 'react'
import './LoginForm.css'
import { ACCESS_TOKEN_NAME } from '../../utils/api'
import { withRouter } from 'react-router-dom'
import { login } from '../../utils/communication'

function LoginForm (props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    successMessage: null
  })
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()
    const payload = {
      email: state.email,
      password: state.password
    }
    login(payload).then(function (response) {
      if (response.data.code === 200) {
        setState(prevState => ({
          ...prevState,
          successMessage: '登录成功，正在前往主页..'
        }))
        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.data)
        redirectToHome()
        props.showError(null)
      } else if (response.data.code === 204) {
        props.showError('密码错误！')
      } else {
        props.showError('邮箱不存在！')
      }
    })
      .catch(function (error) {
        console.log(error)
      })
  }
  const redirectToHome = () => {
    props.updateTitle('Home')
    props.history.push('/home')
  }
  const redirectToRegister = () => {
    props.history.push('/register')
    props.updateTitle('Register')
  }
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">邮箱地址</label>
          <input type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="请输入邮箱地址"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">密码</label>
          <input type="password"
            className="form-control"
            id="password"
            placeholder="请输入密码"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check">
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >登录
        </button>
      </form>
      <div className="alert alert-success mt-2"
        style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>没有账户？ </span>
        <span className="loginText" onClick={() => redirectToRegister()}>注册</span>
      </div>
    </div>
  )
}

export default withRouter(LoginForm)

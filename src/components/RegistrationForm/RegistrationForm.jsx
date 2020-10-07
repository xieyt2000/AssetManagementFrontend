import React, { useState } from 'react'
import './RegistrationForm.css'
import { ACCESS_TOKEN_NAME } from '../../utils/api'
import { withRouter } from 'react-router-dom'
import { register } from '../../utils/communication'

function RegistrationForm (props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    successMessage: null
  })
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      props.showError(null)
      const payload = {
        email: state.email,
        password: state.password
      }
      register(payload).then(function (response) {
        if (response.data.code === 200) {
          setState(prevState => ({
            ...prevState,
            successMessage: '注册成功'
          }))
          //localStorage.setItem(ACCESS_TOKEN_NAME, response.data.data)
          //redirectToHome()
          props.showError(null)
        }
        else if (response.data.code === 201) {
            props.showError('该邮箱已被注册！')
        } 
        else {
          props.showError('网络连接失败！')
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      props.showError('用户名或密码格式错误！')
    }
  }
  const redirectToHome = () => {
    props.updateTitle('Home')
    props.history.push('/home')
  }
  const redirectToLogin = () => {
    props.updateTitle('Login')
    props.history.push('/login')
  }
  const handleSubmitClick = (e) => {
    e.preventDefault()
    if (state.password === state.confirmPassword) {
      sendDetailsToServer()
    } else {
      props.showError('两次输入密码不一致')
    }
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
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">确认密码</label>
          <input type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="请再次输入密码"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          注册
        </button>
      </form>
      <div className="alert alert-success mt-2"
        style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>已有账号？ </span>
        <span className="loginText" onClick={() => redirectToLogin()}>登录</span>
      </div>

    </div>
  )
}

export default withRouter(RegistrationForm)

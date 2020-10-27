import { message } from 'antd'

export const handleResponse = (promise, oprMessage, stateToSet, self) => {
  promise.then((res) => {
    if (res.data.code === 200) {
      message.success(oprMessage + '成功！')
      self.setState({
        [stateToSet]: res.data.data
      })
    } else {
      message.error(oprMessage + '失败，' + res.data.message)
    }
  }).catch(() => {
    message.error(oprMessage + '失败，请检查网络连接后重试！')
  })
}

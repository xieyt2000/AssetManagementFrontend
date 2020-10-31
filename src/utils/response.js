import { message } from 'antd'

export const handleResponse = (promise, oprMessage, self,
  dataState = null, modalState = null, successFunc = null, finallyFunc = null) => {
  promise.then((res) => {
    if (res.data.code === 200) {
      message.success(oprMessage + '成功！')
      if (dataState != null) {
        self.setState({
          [dataState]: res.data.data
        })
      }
      if (successFunc != null) {
        successFunc()
      }
    } else {
      message.error(oprMessage + '失败，' + res.data.message)
    }
  }).catch(() => {
    message.error(oprMessage + '失败，请检查网络连接后重试！')
  }).finally(() => {
    if (finallyFunc != null) {
      finallyFunc()
    }
    if (modalState != null) {
      self.setState(modalState)
    }
  })
}

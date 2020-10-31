export default {
  getLog: (_) => {
    return {
      code: 200,
      data: [{
        time: '2020-10-31 15:06:17',
        method: 'POST',
        level: 'INFO',
        path: '/api/logs',
        message: '获取日志',
        username: 'admin'
      }]
    }
  }
}

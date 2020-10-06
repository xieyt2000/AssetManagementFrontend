import axios from 'axios'

function formateDate (date) {
  // Expect "YYYY-MM-DDTHH:mm:ss.sssZ"
  date = date.toISOString()
  return date.split('T')[0]
}

class MeetingApi {
  static fetch (date) {
    return axios.get('/meeting', {
      params: {
        date: formateDate(date)
      }
    })
  }

  static post (date, data) {
    Object.assign(data, { date: formateDate(date) })
    return axios.post('/meeting', data)
  }

  static delete (id) {
    return axios.delete('/meeting', {
      params: {
        id: id
      }
    })
  }
}

export default MeetingApi

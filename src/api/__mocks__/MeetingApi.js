class MeetingApi {
  static fetch (date) {
    const data = [
      {
        id: 1,
        startTime: '14:00',
        position: 'FIT',
        teams: [
          'Team1',
          'Team2'
        ]
      },
      {
        id: 2,
        startTime: '10:00',
        position: 'FIT',
        teams: [
          'Team3'
        ]
      }
    ]
    return new Promise((resolve, reject) => {
      resolve({ data: data })
    })
  }

  static post (date, data) {
    return new Promise((resolve, reject) => {
      resolve({})
    })
  }

  static delete (date, data) {
    return new Promise((resolve, reject) => {
      resolve({})
    })
  }
}

export default MeetingApi

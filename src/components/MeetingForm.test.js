import React from 'react'
import ReactDOM from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'
import MeetingForm from './MeetingForm'

let div

beforeEach(() => {
  div = document.createElement('div')
  document.body.appendChild(div)
})

afterEach(() => {
  document.body.removeChild(div)
  div = null
})

test('MeetingForm renders without crashing', () => {
  const ref = React.createRef()
  act(() => {
    ReactDOM.render(<MeetingForm ref={ ref } />, div)
  })
  const meetingForm = ref.current

  // Type "startTime"
  const startTimeInput = div.querySelector('input[name=startTime]')
  const startTime = '12:00'
  act(() => {
    Simulate.change(startTimeInput, { target: { value: startTime } })
  })
  expect(meetingForm.state.startTime).toBe(startTime)

  // Type "position"
  const positionInput = div.querySelector('input[name=position]')
  const position = 'Building 1'
  act(() => {
    Simulate.change(positionInput, { target: { value: position } })
  })
  expect(meetingForm.state.position).toBe(position)

  // Type "teams"
  const teamsInput = div.querySelector('textarea[name=teams]')
  const teams = ['Team1', 'Team2']
  const teamsStr = teams.join('\n')
  act(() => {
    Simulate.change(teamsInput, { target: { value: teamsStr } })
  })
  expect(meetingForm.state.teams).toBe(teamsStr)
})

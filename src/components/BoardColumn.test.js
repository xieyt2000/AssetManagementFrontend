import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Board from './Board'
import BoardColumn from './BoardColumn'

jest.mock('../api/MeetingApi')

let div

beforeEach(() => {
  div = document.createElement('div')
  document.body.appendChild(div)
})

afterEach(() => {
  document.body.removeChild(div)
  div = null
})

test('Column renders without crashing', () => {
  act(() => {
    ReactDOM.render(<Board />, div)
  })

  // Click "Previous Week" button
  const prevButton = div.querySelector('button .left')
  act(() => {
    prevButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
})

test('Column renders with props checking', () => {
  expect(() => {
    ReactDOM.render(<BoardColumn date={ '1900-01-01' } />, div)
  }).toThrow(TypeError)
})

test('Item can be added', () => {
  const ref = React.createRef()
  act(() => {
    ReactDOM.render(<BoardColumn date={ new Date() } ref={ ref } />, div)
  })
  const column = ref.current
  const addButton = div.querySelector('.icon.add')
  act(() => {
    addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expect(column.state.adding).toBe(true)

  const modal = document.getElementsByClassName('modals')[0]
  const submitButton = modal.querySelector('button')
  act(() => {
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expect(column.state.adding).toBe(false)
})

test('Item can be deleted', () => {
  act(async () => {
    const ref = React.createRef()
    ReactDOM.render(<BoardColumn date={ new Date() } ref={ ref } />, div)
    ref.current.setState({ data: [{ id: 1, startTime: '14:00', position: '', teams: [] }] })
  })
  const deleteButton = div.querySelector('.icon.delete')
  act(() => {
    deleteButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
})

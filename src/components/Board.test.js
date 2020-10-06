import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Board from './Board'

jest.mock('./BoardColumn')

let div

beforeEach(() => {
  div = document.createElement('div')
  document.body.appendChild(div)
})

afterEach(() => {
  document.body.removeChild(div)
  div = null
})

test('Board renders without crashing', () => {
  act(() => {
    ReactDOM.render(<Board />, div)
  })
})

test('Board.start can be controlled by buttons', () => {
  const ref = React.createRef()
  act(() => {
    ReactDOM.render(<Board ref={ ref } />, div)
  })
  const board = ref.current
  const startDate = board.state.start.getTime()

  // Click "Previous Week" button
  const prevButton = div.querySelector('button .left')
  act(() => {
    prevButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expect(board.state.start.getTime()).toBeLessThan(startDate)

  // Click "Next Week" button
  const nextButton = div.querySelector('button .right')
  act(() => {
    nextButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expect(board.state.start.getTime()).toEqual(startDate)
})

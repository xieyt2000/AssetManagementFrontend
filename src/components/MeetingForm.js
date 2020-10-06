import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import MeetingApi from '../api/MeetingApi'

class MeetingForm extends React.Component {
  constructor (props) {
    super(props)
    this.callback = props.callback || (() => {})
    this.state = {
      startTime: '14:00',
      position: '',
      teams: ''
    }
  }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit () {
    const data = {
      startTime: this.state.startTime,
      position: this.state.position,
      teams: this.state.teams.split('\n').filter(team => team)
    }
    MeetingApi.post(this.props.date, data)
      .catch(error => {
        console.log(error)
      })
    this.callback()
  }

  render () {
    return (
      <Form onSubmit={ () => { this.handleSubmit() } }>
        <Form.Input fluid
          name='startTime'
          label='Start Time'
          placeholder='Start Time'
          value={ this.state.startTime }
          onChange={ (e, target) => { this.handleChange(e, target) } } />
        <Form.Input fluid
          name='position'
          label='Position'
          placeholder='Position'
          value={ this.state.position }
          onChange={ (e, target) => { this.handleChange(e, target) } } />
        <Form.TextArea
          name='teams'
          label='Teams'
          placeholder='One team per line'
          value={ this.state.teams }
          onChange={ (e, target) => { this.handleChange(e, target) } } />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

MeetingForm.propTypes = {
  callback: PropTypes.func,
  date: PropTypes.instanceOf(Date)
}

export default MeetingForm

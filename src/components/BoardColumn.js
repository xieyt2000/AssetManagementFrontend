import React from 'react'
import PropTypes from 'prop-types'
import { Card, Dimmer, Icon, Label, List, Loader, Modal } from 'semantic-ui-react'

import MeetingApi from '../api/MeetingApi'
import MeetingForm from './MeetingForm'

class BoardColumn extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [],
      adding: false,
      loading: false
    }
  }

  componentDidMount () {
    this.load()
  }

  componentDidUpdate (prevProps) {
    if (this.props.date !== prevProps.date) {
      this.load()
    }
  }

  async load () {
    this.setState({ loading: true })
    MeetingApi.fetch(this.props.date)
      .then(response => {
        const data = response.data
        data.sort((x, y) => x.startTime > y.startTime)
        this.setState({ data: data, loading: false })
      }).catch(error => {
        console.log(error)
        this.setState({ data: [], loading: false })
      })
  }

  remove (id) {
    MeetingApi.delete(id)
      .catch(error => {
        console.log(error)
      })
    this.load()
  }

  renderItem () {
    return this.state.data.map(item => (
      <List.Item as={ Card } key={ item.id }>
        <List.Header>
          <Label className='fluid'>
            { item.startTime }
            &nbsp;
            { item.position }
            <Icon name='delete' circular color='red' inverted
              title='Delete Meeting'
              onClick={ () => { this.remove(item.id) } } />
          </Label>
        </List.Header>
        <List.Description>
          <List.List as="ul">
            {
              item.teams.map(team => (
                <List.Item as="li" key={ item.id + '-' + team }>
                  { team }
                </List.Item>
              ))
            }
          </List.List>
        </List.Description>
      </List.Item>
    ))
  }

  onFormSubmit () {
    this.setState({ adding: false })
    this.load()
  }

  render () {
    const date = this.props.date.toLocaleDateString()
    const weekday = this.props.date.toLocaleDateString(undefined, { weekday: 'long' })
    return (
      <Card>
        <Card.Header>
          <Label className='fluid'>
            { date }
            &nbsp;
            { weekday }
            <Icon name='add' circular color='green' inverted
              title='Add Meeting'
              onClick={ () => { this.setState({ adding: true }) } } />
          </Label>
        </Card.Header>
        <Card.Content>
          <Dimmer active={ this.state.loading }>
            <Loader />
          </Dimmer>
          <List>
            { this.renderItem() }
          </List>
          <Modal open={ this.state.adding }
            onClose={ () => { this.setState({ adding: false }) } }>
            <Modal.Header>
              Add a meeting on { date }
            </Modal.Header>
            <Modal.Content>
              <MeetingForm date={ this.props.date } callback={ () => { this.onFormSubmit() } } />
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    )
  }
}

BoardColumn.propTypes = {
  date: PropTypes.instanceOf(Date)
}

export default BoardColumn

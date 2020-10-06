import React from 'react'
import { Button, Grid, Icon } from 'semantic-ui-react'

import BoardColumn from './BoardColumn'

class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      start: new Date()
    }
  }

  renderContent () {
    return [...Array(7).keys()].map(index => {
      var date = new Date(this.state.start)
      date.setDate(date.getDate() + index)
      return (
        <Grid.Column width={ 2 } key={ index }>
          <BoardColumn date={ date } />
        </Grid.Column>
      )
    })
  }

  changeStart (delta) {
    var date = new Date(this.state.start)
    date.setDate(date.getDate() + delta)
    this.setState({ start: date })
  }

  render () {
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column floated='right' width={4}>
            <Button icon labelPosition='left' onClick={ () => { this.changeStart(-7) } }>
              <Icon name='left arrow' />
              Previous Week
            </Button>
            <Button icon labelPosition='right' onClick={ () => { this.changeStart(7) } }>
              Next Week
              <Icon name='right arrow' />
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          { this.renderContent() }
        </Grid.Row>
      </Grid>
    )
  }
}

export default Board

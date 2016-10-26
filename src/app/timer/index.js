import React, {Component} from 'react'
import {button as buttonStyles} from '../styles'

class Timer extends Component {
  state = {
    time: 0,
    running: false,
  }

  _timer = null
  _lastEnteredTime = 0

  handleChange = ({target: {value}}) => {
    this._lastEnteredTime = Number(value)
    this.reset()
  }

  handleRunClick = () => {
    if (this.state.running) {
      this.stop()
    } else {
      this.start()
    }
  }

  handleClearClick = () => {
    this.stop()
    this.reset()
  }

  start() {
    this._timer = setInterval(() => {
      const {time} = this.state
      const newTime = time - 1
      if (newTime <= 0) {
        this.stop()
        this.reset()
      } else {
        this.setState({time: newTime})
      }
    }, 1000)

    this.setState({running: true})
  }

  stop() {
    clearInterval(this._timer)
    this._timer = null
    this.setState({running: false})
  }

  reset() {
    this.setState({time: this._lastEnteredTime})
  }

  render() {
    const {time, running} = this.state
    const inputStyles = {
      fontSize: '5em',
      textAlign: 'center',
      border: 'none',
      background: 'none',
      outline: 'none',
      maxWidth: 360,
      height: 90,
    }
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{maxWidth: 400, margin: 'auto'}}>
          <input style={inputStyles} onChange={this.handleChange} value={time || '0'} type="number" />
        </div>
        <button style={buttonStyles} onClick={this.handleRunClick} data-test="toggle">{running ? 'Stop' : 'Start'}</button>
        <button style={buttonStyles} onClick={this.handleClearClick} data-test="clear">Reset</button>
      </div>
    )
  }
}

export default Timer

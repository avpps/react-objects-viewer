import React, { Component } from 'react';
import JSON5 from 'json5'
import { ParserTextAreaStyle } from './utils/cssHelpers'


class JsonTab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      parsedJson: null
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput (e) {
    const val = e.target.value
    let parsedJson
    try {
      parsedJson = JSON5.stringify(JSON5.parse(val), null, '   ')
    } catch(err) {
      parsedJson = err
    }

    this.setState({
      parsedJson: parsedJson
    })
  }

  render () {
    return (
      <div>
        <textarea style={ParserTextAreaStyle()} onChange={(e) => this.handleInput(e)}></textarea>
        <textarea style={ParserTextAreaStyle()} value={this.state.parsedJson}></textarea>
      </div>
    )
  }
}



export default JsonTab;

import React, { Component } from 'react';
import './JsonTab.css';


class XmlTab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      parsedXML: null
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput (e) {
    const val = e.target.value
    let parsedXML
    try {
      parsedXML = val
    } catch(err) {
      parsedXML = err
    }

    this.setState({
      parsedXML: parsedXML
    })
  }

  render () {
    return (
      <div>
        <textarea onChange={(e) => this.handleInput(e)}></textarea>
        <textarea value={this.state.parsedXML}></textarea>
      </div>
    )
  }
}



export default XmlTab;

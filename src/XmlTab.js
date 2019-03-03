import React, { Component } from 'react';
import { ParserTextAreaStyle } from './utils/cssHelpers'

var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

class XmlTab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rawText: null
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput (e) {
    this.setState({
      rawText: e.target.value
    })
  }

  render () {
    let parser = new DOMParser()
    let serializer = new XMLSerializer()
    let formatter = require('xml-formatter');
    let formatterOptions = {
      indentations: '  ',
      stripComments: true,
      collapseContent: true
    }
    let output

    try {
      let parsed = parser.parseFromString(this.state.rawText, 'text/xml')
      let serialized = serializer.serializeToString(parsed)
      output = formatter(serialized, formatterOptions)
    } catch(err) {
      output = err
    }

    return (
      <div>
        <textarea style={ParserTextAreaStyle()} onChange={(e) => this.handleInput(e)}></textarea>
        <textarea style={ParserTextAreaStyle()} value={output}></textarea>
      </div>
    )
  }
}



export default XmlTab;

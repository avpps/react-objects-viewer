import React, { Component } from 'react';
import './ObjectViewer.css';

import { getSample } from './SampleObjects'
import OptionBoard from './OptionBoard';

const JSON = require('json5')
const JSON3 = require('json3')
const JSON5 = require('json5')




class Output extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    let str
    let summ
    try {
      summ = this.props.Content.length
      str = JSON5.stringify(this.props.Content, null, '    ')
    } catch (err) {
      summ = ''
      str = err
    }
    return <div>
    <textarea className='summ' value={summ}/>
    <textarea value={str}/>
    </div>
  }
}

class ObjectViewer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      objectsArray: null
    }
    this.getObjectsArray = this.getObjectsArray.bind(this)
  }

  getObjectsArray (a) {
    this.setState({
      objectsArray: a
    })
  }

  render () {
    let sample = getSample()
    return (
      <div className='divMain'>
        <div className='div30'>
          <OptionBoard ObjectsArray={sample} sendObjectsArray={(a) => this.getObjectsArray(a)}/>
        </div>
        <div className='div70'>
          <Output Content={this.state.objectsArray}/>
        </div>
      </div>
    )
  }
}

export default ObjectViewer;

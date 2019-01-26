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
    try {
      console.log('zaczelo')
      console.log(this.props.Content)
      return <div>{JSON5.stringify(this.props.Content)}</div>
    } catch (err) {
      return <div>err</div>
    }
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

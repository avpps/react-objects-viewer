import React, { Component } from 'react';
import './ObjectViewer.css';

import { getSample } from './SampleObjects'
import OptionBoard from './OptionBoard';

const JSON = require('json5')
const JSON3 = require('json3')
const JSON5 = require('json5')




class Output extends Component {
  render () {
    return <div><textarea>{JSON3.stringify(this.props.Content, null, '  ')}</textarea></div>
  }
}

class ObjectViewer extends Component {

  render () {
    let sample = getSample()
    return (
      <div className='divMain'>
        <div className='div30'>
          <OptionBoard ObjectsArray={sample}/>
        </div>
        <div className='div70'>
          <Output Content={sample}/>
        </div>
      </div>
    )
  }
}

export default ObjectViewer;

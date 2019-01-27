import React, { Component } from 'react';
import './ObjectViewer.css';

import { getSample } from './SampleObjects'
import { getConf} from './conf'
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
      objectsArrays: [[], [], []]
    }
    this.getObjectsArray = this.getObjectsArray.bind(this)
  }

  getObjectsArray (i, a) {
    let oa = this.state.objectsArrays
    oa[i] = a
    this.setState({
      objectsArrays: oa
    })
  }

  render () {
    let sample = getSample()
    let conf = getConf()
    let oa = this.state.objectsArrays
    return (
      <div className='divMain'>
        <div className='div30'>
          <OptionBoard I={0} ObjectsArray={sample} conf={conf[0]}
           sendObjectsArray={(a) => this.getObjectsArray(0, a)}/>
          <OptionBoard I={1} ObjectsArray={oa[0]} conf={conf[1]}
           sendObjectsArray={(a) => this.getObjectsArray(1, a)}/>
          <OptionBoard I={2} ObjectsArray={oa[1]} conf={conf[2]}
           sendObjectsArray={(a) => this.getObjectsArray(2, a)}/>
        </div>
        <div className='div70'>
          <Output Content={oa[2]}/>
        </div>
      </div>
    )
  }
}

export default ObjectViewer;

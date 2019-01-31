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
      objectsArrays: [[], [], [], []]
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
    let conf_dgs = conf['def_group_sort']
    let conf_dbd = conf['def_butt_descr']
    let oa = this.state.objectsArrays
    return (
      <div className='divMain'>
        <div className='div15'>
          <OptionBoard I={0} ObjectsArray={sample}
           conf_dgs={conf_dgs[0]} conf_dbd={conf_dbd}
           sendObjectsArray={(a) => this.getObjectsArray(0, a)}/>
          <OptionBoard I={1} ObjectsArray={oa[0]}
           conf_dgs={conf_dgs[1]} conf_dbd={conf_dbd}
           sendObjectsArray={(a) => this.getObjectsArray(1, a)}/>
        </div>
        <div className='div15'>
          <OptionBoard I={2} ObjectsArray={oa[1]}
           conf_dgs={conf_dgs[2]} conf_dbd={conf_dbd}
           sendObjectsArray={(a) => this.getObjectsArray(2, a)}/>
           <OptionBoard I={3} ObjectsArray={oa[2]}
            conf_dgs={conf_dgs[3]} conf_dbd={conf_dbd}
            sendObjectsArray={(a) => this.getObjectsArray(3, a)}/>
        </div>
        <div className='div70'>
          <Output Content={oa[3]}/>
        </div>
      </div>
    )
  }
}

export default ObjectViewer;

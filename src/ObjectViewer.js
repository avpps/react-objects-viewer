import React, { Component } from 'react';
import './ObjectViewer.css';

import { getSample } from './SampleObjects'
import { getConf} from './conf'
import OptionBoard from './OptionBoard';
import RGL, {Responsive, WidthProvider} from 'react-grid-layout'
const ReactGridLayout = WidthProvider(RGL);
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
      objectsArrays: [[], [], [], [], []]
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
    var layout = [
      {i: 'a1', x: 0, y: 0, w: 2, h: 15, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a2', x: 0, y: 0, w: 2, h: 15, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a3', x: 2, y: 0, w: 2, h: 30, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a4', x: 0, y: 0, w: 2, h: 10, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a5', x: 2, y: 0, w: 2, h: 10, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'o', x: 4, y: 0, w: 6, h: 40, minW: 6, maxW: 6, isResizable: false, isDraggable: false},
    ];
    return (
      <ReactGridLayout className="layout" layout={layout} cols={10} rowHeight={30} margin={[5, 5]}>
        <div key='a1'>
          <OptionBoard I={0} ObjectsArray={sample}
           conf_dgs={conf_dgs[0]} conf_dbd={conf_dbd}
           sendObjectsArray={(a) => this.getObjectsArray(0, a)}/>
        </div>
        <div key='a2'>
          <OptionBoard I={1} ObjectsArray={oa[0]}
           conf_dgs={conf_dgs[1]} conf_dbd={conf_dbd}
           sendObjectsArray={(a) => this.getObjectsArray(1, a)}/>
        </div>
        <div key='a3'>
          <OptionBoard I={2} ObjectsArray={oa[1]}
           conf_dgs={conf_dgs[2]} conf_dbd={conf_dbd}
           sendObjectsArray={(a) => this.getObjectsArray(2, a)}/>
        </div>
        <div key='a4'>
           <OptionBoard I={3} ObjectsArray={oa[2]}
            conf_dgs={conf_dgs[3]} conf_dbd={conf_dbd}
            sendObjectsArray={(a) => this.getObjectsArray(3, a)}/>
        </div>
        <div key='a5'>
           <OptionBoard I={4} ObjectsArray={oa[3]}
            conf_dgs={conf_dgs[4]} conf_dbd={conf_dbd}
            sendObjectsArray={(a) => this.getObjectsArray(4, a)}/>
        </div>
        <div key='o'>
          <Output Content={oa[4]}/>
        </div>
      </ReactGridLayout>
    )
  }
}

export default ObjectViewer;

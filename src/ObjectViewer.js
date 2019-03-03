import React, { Component } from 'react';
import RGL, {Responsive, WidthProvider} from 'react-grid-layout'

import './ObjectViewer.css';

import { getConf} from './conf'
import OptionBoard from './OptionBoard'
import ContentSection from './ContentSection'
import {
  DivBorderedStyle
} from './utils/cssHelpers'

const ReactGridLayout = WidthProvider(RGL);


class ObjectViewer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: '2',
      objectsArrays: [[], [], [], [], [], []],
      activeBoards: [true, true, true, true, true],
    }
    this.setBoardActiveStatus = this.setBoardActiveStatus.bind(this)
    this.setObjectsArray = this.setObjectsArray.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.Content !== prevProps.Content) {
      this.setObjectsArray(0, this.props.Content)
    }
  }

  setObjectsArray (i, a) {
    let oa = this.state.objectsArrays
    oa[i] = a
    this.setState({
      objectsArrays: oa
    })
  }

  setBoardActiveStatus(i) {
    let ab = this.state.activeBoards
    ab[i] = !ab[i]
    this.setState({activeBoards: ab})
  }

  render () {
    let rows = 100
    let rowHeight = (window.innerHeight - 15 - 42.75) / rows
    let objectKeys = []
    try {
       objectKeys = Object.keys(this.state.objectsArrays[0][0])
    } catch(err) {}
    let conf = getConf()
    let conf_dgs = conf['def_group_sort']
    let conf_dbd = conf['def_butt_descr']
    let conf_ddc = conf['def_descr_color']
    let oa = this.state.objectsArrays
    var layout = [
      {i: 'a0', x: 0, y: 0, w: 2, h: 30, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a1', x: 0, y: 0, w: 2, h: 30, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a2', x: 2, y: 0, w: 2, h: 70, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a3', x: 0, y: 0, w: 2, h: 40, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a4', x: 2, y: 0, w: 2, h: 30, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'o', x: 4, y: 0, w: 6, h: 100, minW: 6, maxW: 6, isResizable: false, isDraggable: false},
    ];

    let boards = []
    for (let i in this.state.activeBoards) {
      let key = 'a' + i
      i = parseInt(i)
      boards.push(
        <div key={key}>
          <OptionBoard I={i} ObjectsArray={oa[i]} objectKeys={objectKeys}
            conf_dgs={conf_dgs[i]} conf_dbd={conf_dbd} conf_ddc={conf_ddc}
            sendObjectsArray={(a) => this.setObjectsArray(i+1, a)}
            activeStatus={this.state.activeBoards[i.toString()]}
            setBoardActiveStatus={(s) => this.setBoardActiveStatus(i, s)}/>
        </div>
      )
    }

    return (
            <div>
              <ReactGridLayout
               className="layout"
               layout={layout} cols={10}
               rowHeight={rowHeight} maxRows={rows}
               margin={[0, 0]}>
                {boards}
                <div style={DivBorderedStyle()} key='o'>
                  <ContentSection Content={oa[5]}/>
                </div>
              </ReactGridLayout>
            </div>

    )
  }
}

export default ObjectViewer;

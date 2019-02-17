import React, { Component } from 'react';
import './ObjectViewer.css';

import { getSample } from './SampleObjects'
import { getConf} from './conf'
import BaseOptions from './BaseOptions'
import OptionBoard from './OptionBoard'
import RGL, {Responsive, WidthProvider} from 'react-grid-layout'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

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
      activeTab: '2',
      objectsArrays: [getSample(), [], [], [], [], []],
      activeBoards: [true, true, true, true, true],
    }
    this.setBoardActiveStatus = this.setBoardActiveStatus.bind(this)
    this.setObjectsArray = this.setObjectsArray.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  updateDimensions () {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }
  componentWillMount () {
    this.updateDimensions();
  }
  componentDidMount () {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount () {
    window.removeEventListener("resize", this.updateDimensions);
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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render () {
    let rows = 100
    let rowHeight = (window.innerHeight - 15 - 42.75) / rows
    let sample = getSample()
    let objectKeys = Object.keys(sample[0])
    let conf = getConf()
    let conf_dgs = conf['def_group_sort']
    let conf_dbd = conf['def_butt_descr']
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
            conf_dgs={conf_dgs[i]} conf_dbd={conf_dbd}
            sendObjectsArray={(a) => this.setObjectsArray(i+1, a)}
            activeStatus={this.state.activeBoards[i.toString()]}
            setBoardActiveStatus={(s) => this.setBoardActiveStatus(i, s)}/>
        </div>
      )
    }

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              OPTIONS
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              JS VIEWER
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              JSON
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              XML
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div>
              <ReactGridLayout
               className="layout"
               layout={layout} cols={10}
               rowHeight={rowHeight} maxRows={rows}
               margin={[0, 0]}>
                {boards}
                <div key='o'>
                  <Output Content={oa[5]}/>
                </div>
              </ReactGridLayout>
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div>
            </div>
          </TabPane>
          <TabPane tabId="4">
            <div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default ObjectViewer;

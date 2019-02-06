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
      activeTab: '1',
      objectsArrays: [[], [], [], [], []]
    }
    this.getObjectsArray = this.getObjectsArray.bind(this)
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

  getObjectsArray (i, a) {
    let oa = this.state.objectsArrays
    oa[i] = a
    this.setState({
      objectsArrays: oa
    })
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
    let rowHeight = (window.innerHeight - 15) / rows
    let sample = getSample()
    let objectKeys = Object.keys(sample[0])
    let conf = getConf()
    let conf_dgs = conf['def_group_sort']
    let conf_dbd = conf['def_butt_descr']
    let oa = this.state.objectsArrays
    var layout = [
      {i: 'a0', x: 0, y: 0, w: 2, h: 10, minW: 2, maxW: 2, isResizable: false, isDraggable: false},
      {i: 'a1', x: 0, y: 0, w: 2, h: 30, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a2', x: 0, y: 0, w: 2, h: 30, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a3', x: 2, y: 0, w: 2, h: 70, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a4', x: 0, y: 0, w: 2, h: 30, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'a5', x: 2, y: 0, w: 2, h: 30, minW: 2, maxW: 2, isResizable: true, isDraggable: false},
      {i: 'o', x: 4, y: 0, w: 6, h: 100, minW: 6, maxW: 6, isResizable: false, isDraggable: false},
    ];
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
                <div key='a0'>
                  <BaseOptions />
                </div>
                <div key='a1'>
                  <OptionBoard I={0} ObjectsArray={sample} objectKeys={objectKeys}
                  conf_dgs={conf_dgs[0]} conf_dbd={conf_dbd}
                  sendObjectsArray={(a) => this.getObjectsArray(0, a)}/>
                </div>
                <div key='a2'>
                  <OptionBoard I={1} ObjectsArray={oa[0]} objectKeys={objectKeys}
                  conf_dgs={conf_dgs[1]} conf_dbd={conf_dbd}
                  sendObjectsArray={(a) => this.getObjectsArray(1, a)}/>
                </div>
                <div key='a3'>
                  <OptionBoard I={2} ObjectsArray={oa[1]} objectKeys={objectKeys}
                  conf_dgs={conf_dgs[2]} conf_dbd={conf_dbd}
                  sendObjectsArray={(a) => this.getObjectsArray(2, a)}/>
                </div>
                <div key='a4'>
                  <OptionBoard I={3} ObjectsArray={oa[2]} objectKeys={objectKeys}
                  conf_dgs={conf_dgs[3]} conf_dbd={conf_dbd}
                  sendObjectsArray={(a) => this.getObjectsArray(3, a)}/>
                </div>
                <div key='a5'>
                  <OptionBoard I={4} ObjectsArray={oa[3]} objectKeys={objectKeys}
                  conf_dgs={conf_dgs[4]} conf_dbd={conf_dbd}
                  sendObjectsArray={(a) => this.getObjectsArray(4, a)}/>
                </div>
                <div key='o'>
                  <Output Content={oa[4]}/>
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

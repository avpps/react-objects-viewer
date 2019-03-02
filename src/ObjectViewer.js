import React, { Component } from 'react';
import './ObjectViewer.css';

import { getConf} from './conf'
import BaseOptions from './BaseOptions'
import OptionBoard from './OptionBoard'
import RGL, {Responsive, WidthProvider} from 'react-grid-layout'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import JsonTab from './JsonTab'
import XmlTab from './XmlTab'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import InfiniteScroll from 'react-infinite-scroll-component';

const ReactGridLayout = WidthProvider(RGL);
const JSON = require('json5')
const JSON3 = require('json3')
const JSON5 = require('json5')




class Output extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      hasMore: true,
      page: 0,
      pageSize: 500
    }
    this.fetchMoreData = this.fetchMoreData.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.Content !== prevProps.Content) {
      this.setState({
        items: [],
        hasMore: true,
        page: 0,
      }, this.fetchMoreData)
    }
  }

  presentation (i) {
    let cont
    try {
      cont = JSON5.stringify(i['json_cont'], null, '    ')
    } catch (err) {
      cont = i['str_cont']
    }
    return (
      <div>
        <span>{i['datetime']} {i['user_id']}</span>
        <pre style={{color: '#7D8C93'}}>{cont}</pre>
        <br />
      </div>
    )
  }

  fetchMoreData () {
    setTimeout(() => {
      let hasMore = this.state.hasMore
      let page = this.state.page
      let pageSize = this.state.pageSize
      let start = page * pageSize
      let end = start + pageSize
      let newItems = this.state.items.concat(
        this.props.Content.slice(start, end).map((i) => (
          this.presentation(i)
      )))
      if (newItems.length >= this.props.Content.length) {
        hasMore = false
      }

      console.log(
        'start', start,
        'end', end,
        'page', page,
        'content', this.props.Content.length,
        'content_splice', this.props.Content.slice(start, end).length,
        'hasMore', hasMore,
        'newItems', newItems.length
      )
      this.setState({
        items: newItems,
        hasMore: hasMore,
        page: this.state.page += 1
      });
    },
    100);
  }

  render() {
    console.log(this.state.items.length)

    return (
      <div id="scrollableDiv" style={{ height: '100%', overflow: "auto" }}>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={'loader...'}
          scrollableTarget="scrollableDiv"
        >
          {this.state.items}
        </InfiniteScroll>
      </div>
    );
  }
}

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
    this.updateDimensions = this.updateDimensions.bind(this)
    this.toggle = this.toggle.bind(this)
    this.onDrop = this.onDrop.bind(this)
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

    onDrop (acceptedFiles) {
      acceptedFiles.forEach(file => {
          const reader = new FileReader();
          reader.onload = () => {
              const fileAsBinaryString = reader.result;

              this.setObjectsArray(0, JSON3.parse(fileAsBinaryString))

          };
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');

          reader.readAsBinaryString(file);
      });
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
              <Dropzone onDrop={this.onDrop}>
                {({getRootProps, getInputProps, isDragActive}) => {
                  return (
                    <div
                      {...getRootProps()}
                      className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                    >
                      <input {...getInputProps()} />
                      {
                        isDragActive ?
                          <p>Drop files here...</p> :
                          <p>Try dropping some files here, or click to select files to upload.</p>
                      }
                    </div>
                  )
                }}
              </Dropzone>
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
            <JsonTab />
          </TabPane>
          <TabPane tabId="4">
            <XmlTab />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default ObjectViewer;

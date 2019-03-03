import React, { Component } from 'react';
import './ObjectViewer.css';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import JsonTab from './JsonTab'
import XmlTab from './XmlTab'
import Dropzone from 'react-dropzone'

import BaseOptions from './BaseOptions'
import ObjectViewer from './ObjectViewer'
import {
  DivBorderedStyle
} from './utils/cssHelpers'

const JSON = require('json5')
const JSON3 = require('json3')
const JSON5 = require('json5')


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: '2',
      input: []
    }
    this.updateInput = this.updateInput.bind(this)
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

  updateInput(inp) {
    this.setState({
      input: inp
    });
  }

  onDrop (acceptedFiles) {
    acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            this.updateInput(JSON3.parse(fileAsBinaryString))
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);
    });
  }

  render () {
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
                      className={classnames('dropzone', {'dropzone--isActive': isDragActive})}
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
            <ObjectViewer Content={this.state.input}/>
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

export default App;

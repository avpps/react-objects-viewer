import React, { Component } from 'react';
import _ from 'lodash'
import Select from 'react-select';
import './ObjectViewer.css';

import { getConf} from './conf'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  InputStyle,
  DivBorderedStyle, SelectStyle, DivStyle, UnselectableOptions
} from './utils/cssHelpers'
import DelayedInput from './DelayedInput'

const JSON = require('json5')
const JSON3 = require('json3')
const JSON5 = require('json5')


class ContentItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cont: this.props.cont
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cont !== prevProps.cont) {
      this.setState({cont: this.props.cont});
    }
  }

  render () {
    let obj = this.props.obj
    let cont = this.state.cont
    let conf_dgs = this.props.conf_dgs

    let contFormatted
    try {
      contFormatted = JSON5.stringify(obj[cont], null, '    ')
    } catch (err) {
      contFormatted = obj[cont]
    }
    return (
      <div style={{height: 'auto'}}>
        <span>{obj['datetime']} {obj['user_id']}</span>
        <pre style={{color: '#7D8C93'}}>{contFormatted}</pre>
        <br />
      </div>
    )
  }
}


class ContentSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      hasMore: true,
      pageSize: 300,
      cont: this.props.conf_dgs[0],
      headCont: this.props.conf_dgs[1],
      sort: this.props.conf_dgs[2],
      sortOrder: 'asc',
      selectedOption: null
    }
    this.presentation = this.presentation.bind(this)
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this)
    this.handleContChange = this.handleContChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this)
  }

  presentation () {
    let pageSize = this.state.pageSize
    let sort = this.state.sort
    let sortOrder = this.state.sortOrder
    let cont = this.state.cont
    let conf_dgs = this.props.conf_dgs

    let content = _(this.props.Content.slice(0, pageSize))
    content = content.orderBy(function (c) {return c[sort]}, sortOrder)
    content = content.map(function (c) {return (
      <ContentItem
        cont={cont}
        obj={c}
        conf_dgs={conf_dgs}
      />
    )})
    return content.value()
  }

  Info () {
    let style = Object.assign({
    }, InputStyle())

    return <div style={{width: '120px', display: 'inline-block'}}>
      {this.props.Content.length}
    </div>
  }

  PageSize () {
    let style = Object.assign({
    }, InputStyle())

    return <div style={{width: '120px', display: 'inline-block'}}>
      <DelayedInput
        onChange={this.handleFilterChange}
        type='number'
        value={this.state.pageSize}
        onChange={this.handlePageSizeChange}
      />
    </div>
  }

  handlePageSizeChange (val) {
    this.setState({
      pageSize: val,
    }, this.presentation)
  }

  Cont () {
    let objKeys = []
    if (this.props.Content[0]) {
      objKeys = Object.keys(this.props.Content[0])
    } else if (this.props.objectKeys.length > 0) {
      objKeys = this.props.objectKeys
    } else {
      objKeys = this.state.cont
    }

    let options = []
    for (const o of objKeys) {
      options.push({value: o, label: o})
    }

    let selStyle = Object.assign({
    }, SelectStyle())

    return <div style={{width: 'calc((100% - 240px) / 2)', display: 'inline-block'}}>
      <Select
        defaultValue={this.props.conf_dgs[0]}
        isMulti
        value={this.state.selectedOption}
        onChange={this.handleContChange}
        options={options}
      />
    </div>
  }

  handleContChange (val) {
    this.setState({
      cont: val,
    })
  }

  Sort () {
    let options = []
    let objKeys = []
    if (this.props.Content[0]) {
      objKeys = Object.keys(this.props.Content[0])
    } else if (this.props.objectKeys) {
      objKeys = this.props.objectKeys
    } else {
      objKeys = [this.state.sort]
    }
    for (var i in objKeys) {
      var selected = false
      if (objKeys[i] === this.state.sort) {selected='selected'}
      options.push(<option selected={selected}>{objKeys[i]}</option>)
    }

    let selStyle = Object.assign({}, SelectStyle(), {
      width: 'calc(100% - 50px)'
    })
    let ordStyle = Object.assign({}, DivStyle(), UnselectableOptions(), {
      width: '50px',
      display: 'inline-block',
    })

    return (
      <div style={{width: 'calc((100% - 240px) / 2)', display: 'inline-block'}}>
        <select style={selStyle} onChange={this.handleSortChange}>{options}</select>
        <div style={ordStyle} onClick={this.handleSortOrderChange}>{this.state.sortOrder.toUpperCase()}</div>
      </div>
    )
  }

  handleSortChange (event) {
    let val = event.target.value
    this.setState({
      sort: val
    }, this.setGroups)
  }

  handleSortOrderChange (event) {
    let ord
    if (this.state.sortOrder === 'asc') {
      ord = 'desc'
    } else {
      ord = 'asc'
    }
    this.setState({
      sortOrder: ord
    }, this.setGroups)
  }

  render() {

    let controlDivStyle = Object.assign(
      {}, DivBorderedStyle(),
      { height: '40px', textAlign: 'left'}
    )
    let contDivStyle = Object.assign(
      {}, DivBorderedStyle(),
      { height: 'calc(100% - 40px)', overflow: "auto", textAlign: 'left'}
    )

    return (
      <div>
        <div style={controlDivStyle}>
          {this.PageSize()}
          {this.Info()}
          {this.Cont()}
          {this.Sort()}
        </div>
        <div id="scrollableDiv" style={contDivStyle}>
          {this.presentation()}
        </div>
      </div>
    );
  }
}

export default ContentSection;

import React, { Component } from 'react';
import './ObjectViewer.css';

import { getConf} from './conf'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  DivBorderedStyle, SelectStyle, DivStyle, UnselectableOptions
} from './utils/cssHelpers'

const JSON = require('json5')
const JSON3 = require('json3')
const JSON5 = require('json5')


class ContentSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      hasMore: true,
      page: 0,
      pageSize: 500,
      cont: this.props.conf_dgs[0][0],
      sort: this.props.conf_dgs[1],
      sortOrder: 'asc',
    }
    this.fetchMoreData = this.fetchMoreData.bind(this)
    this.handleContChange = this.handleContChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this)
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
    console.log(this.state.cont, this.props.conf_dgs)
    let cont
    try {
      cont = JSON5.stringify(i[this.state.cont], null, '    ')
    } catch (err) {
      cont = i[this.state.cont]
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

  Cont () {
    let options = []
    let objKeys = []
    if (this.props.Content[0]) {
      objKeys = Object.keys(this.props.Content[0])
    } else if (this.props.objectKeys) {
      objKeys = this.props.objectKeys
    } else {
      objKeys = [this.state.group]
    }
    for (var i in objKeys) {
      var selected = false
      if (objKeys[i] === this.state.cont) {selected='selected'}
      options.push(<option selected={selected}>{objKeys[i]}</option>)
    }

    let selStyle = Object.assign({
    }, SelectStyle())

    return <div style={{width: '50%', display: 'inline-block'}}>
      <select style={selStyle} onChange={this.handleContChange}>{options}</select>
    </div>
  }

  handleContChange (event) {
    let val = event.target.value
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
      <div style={{width: '50%', display: 'inline-block'}}>
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
    console.log(this.state.items.length)

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
          {this.Cont()}
          {this.Sort()}
        </div>
        <div id="scrollableDiv" style={contDivStyle}>
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
      </div>
    );
  }
}

export default ContentSection;

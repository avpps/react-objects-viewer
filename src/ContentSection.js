import React, { Component } from 'react';
import './ObjectViewer.css';

import { getConf} from './conf'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  DivBorderedStyle
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
      <div id="scrollableDiv" style={{ height: '100%', overflow: "auto", textAlign: 'left'}}>
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

export default ContentSection;

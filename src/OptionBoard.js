import React, { Component } from 'react';
import './OptionBoard.css';
import _ from 'lodash'


class OptionBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: 'aaaaaaaaa',
      sort: 'aaaaaaaaa',
      filter: null,
    }
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  Group () {
    let options = []
    let obj0 = Object.keys(this.props.ObjectsArray[0])
    for (var i in obj0) {
      options.push(<option>{obj0[i]}</option>)
    }
    return <div className='divOpt'>
      <select onChange={this.handleGroupChange}>{options}</select>
    </div>
  }

  handleGroupChange (event) {
    let val = event.target.value
    this.setState({
      group: val
    }, this.Presentation)
  }

  Sort () {
    let options = []
    let obj0 = Object.keys(this.props.ObjectsArray[0])
    for (var i in obj0) {
      options.push(<option>{obj0[i]}</option>)
    }
    return <div className='divOpt'>
      <select onChange={this.handleSortChange}>{options}</select>
    </div>
  }

  handleSortChange (event) {
    let val = event.target.value
    this.setState({
      sort: val
    }, this.Presentation)
  }

  Filter () {
    return <div className='divOpt'>
      <input/>
    </div>
  }

  Presentation () {
    console.log('###########################')
    var buttons = []
    var obj = this.props.ObjectsArray
    var group = this.state.group
    var sort = this.state.sort
    var groups = _(obj)
    .groupBy(function (o) {return o[group]})
    .toPairs()
    .sortBy(function (o) {return o[1][0][sort]})
    groups = groups.value()
    console.log(groups)
    console.log(JSON.stringify(groups, null, 2))
    for (let k in groups) {
      buttons.push(
        <button>{groups[k][0]}</button>
      )
    }
    return buttons
  }

  render () {
    const button1 = <button>B1</button>
    const button2 = <button>B2</button>

    const mainDiv = <div className='divInp'>
      {this.Group()}
      {this.Sort()}
      {this.Filter()}
      {this.Presentation()}
    </div>
    return mainDiv
  }

}

export default OptionBoard;

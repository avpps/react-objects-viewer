import React, { Component } from 'react';
import './OptionBoard.css';
import _ from 'lodash'


class OptionBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: true,
      group: 'user_id',
      sort: 'user_id',
      filter: null,
      groups: [],
      groupsSel: [],
      newObjectsArray: []
    }
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleButtonAllClick = this.handleButtonAllClick.bind(this)
  }

  Group () {
    let options = []
    let obj0 = Object.keys(this.props.ObjectsArray[0])
    for (var i in obj0) {
      var selected = false
      if (obj0[i] === this.state.group) {selected='selected'}
      options.push(<option selected={selected}>{obj0[i]}</option>)
    }
    return <div className='divOpt'>
      <select onChange={this.handleGroupChange}>{options}</select>
    </div>
  }

  handleGroupChange (event) {
    let val = event.target.value
    this.setState({
      group: val
    }, this.setGroups)
  }

  Sort () {
    let options = []
    let obj0 = Object.keys(this.props.ObjectsArray[0])
    for (var i in obj0) {
      var selected = false
      if (obj0[i] === this.state.sort) {selected='selected'}
      options.push(<option selected={selected}>{obj0[i]}</option>)
    }
    return <div className='divOpt'>
      <select onChange={this.handleSortChange}>{options}</select>
    </div>
  }

  handleSortChange (event) {
    let val = event.target.value
    this.setState({
      sort: val
    }, this.setGroups)
  }

  Filter () {
    return <div className='divOpt'>
      <input/>
    </div>
  }

  handleButtonClick(b) {
    let i = b.target.value
    let groupsSel = this.state.groupsSel

    if (groupsSel.includes(i)) {
      _.pull(groupsSel, i)
    } else {
      groupsSel.push(i)
    }
    this.setState({
      groupsSel: groupsSel
    }, this.updateNewObjectsArray)
  }

  handleButtonAllClick(b) {
    let groups = this.state.groups
    let groupsSel = this.state.groupsSel
    if (this.state.groupsSel.length === this.state.groups.length) {
      groupsSel = []
    } else {
      var items = []
      for (let i in groups) {
        items.push(i)
      }
      groupsSel = items
    }
    this.setState({
      groupsSel: groupsSel
    }, this.updateNewObjectsArray)
  }

  updateNewObjectsArray() {
    const groups = this.state.groups
    const groupsSel = this.state.groupsSel
    var newObjectsArray = []
    for (let i in groupsSel) {
      let g_id = groupsSel[i]
      for (let ii in groups[g_id][1]) {
        newObjectsArray.push(groups[g_id][1][ii])
      }
    }

    this.setState({
      newObjectsArray: newObjectsArray
    }, this.sendNewObjectsArray)
  }

  sendNewObjectsArray() {
    this.props.sendObjectsArray(this.state.newObjectsArray)
  }

  setGroups () {
    var obj = this.props.ObjectsArray
    var group = this.state.group
    var sort = this.state.sort
    var groups = _(obj)
    .groupBy(function (o) {return o[group]})
    .toPairs()
    .sortBy(function (o) {return o[1][0][sort]})
    groups = groups.value()
    this.setState({
      groups: groups
    })
  }

  Presentation () {
    var buttons = []
    const groups = this.state.groups

    let className = ''
    if (this.state.groupsSel.length === this.state.groups.length) {
      className += 'button-active'
    }
    buttons.push(
      <button className={className}
              onClick={this.handleButtonAllClick}>
              ALL
      </button>
    )
    for (let i in groups) {
      let className = ''
      if (this.state.groupsSel.includes(i)) {
        className += 'button-active'
      }
      buttons.push(
        <button value={i}
                className={className}
                onClick={this.handleButtonClick}>
                {groups[i][0]}
        </button>
      )
    }
    return buttons
  }

  render () {
    if (this.state.initial) {
      this.setGroups()
      this.setState({
        initial: false
      })
    }
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

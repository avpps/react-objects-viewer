import React, { Component } from 'react';
import './OptionBoard.css';
import _ from 'lodash'


class OptionBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: true,
      group: this.props.conf_dgs[0],
      sort: this.props.conf_dgs[1],
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

  componentDidUpdate(prevProps) {
    if (this.props.ObjectsArray !== prevProps.ObjectsArray) {
      this.setGroups()
    }
  }

  Group () {
    let options = []
    let obj0 = []
    try {
      obj0 = Object.keys(this.props.ObjectsArray[0])
    } catch (err) {}
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
      group: val,
      groupsSel: [],
    },
    () => {
      this.setGroups();
    })
  }

  Sort () {
    let options = []
    let obj0 = []
    try {
      obj0 = Object.keys(this.props.ObjectsArray[0])
    } catch (err) {}
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
    let group_k = b.target.value
    let groupsSel = this.state.groupsSel

    if (groupsSel.includes(group_k)) {
      _.pull(groupsSel, group_k)
    } else {
      groupsSel.push(group_k)
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
        items.push(groups[i][0])
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
      let group_k = groupsSel[i]
      let group = _.find(groups, function (o) { return o[0] === group_k })
      if (group) {
        for (let ii in group[1]) {
          newObjectsArray.push(group[1][ii])
        }
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
    }, this.updateNewObjectsArray)
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
    for (let g in groups) {
      let group = this.state.group
      let group_k = groups[g][0]
      let className = ''
      if (this.state.groupsSel.includes(group_k)) {
        className += 'button-active'
      }

      let conf_dbd = this.props.conf_dbd
      let descr = ''
      if (group in conf_dbd) {
        let conf = conf_dbd[group]
        for (let i in conf) {
          let iii = conf[i]
          let val = groups[g][1][0][iii]
          descr += ' ' + val
        }
      } else {
        descr = group_k
      }

      buttons.push(
        <button value={group_k}
                className={className}
                onClick={this.handleButtonClick}>
                {descr}
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
      <div className='divOptGr'>
        {this.Group()}
        {this.Sort()}
        {this.Filter()}
      </div>
      <div className='divBtnGr'>
        {this.Presentation()}
      </div>
    </div>
    return mainDiv
  }

}

export default OptionBoard;

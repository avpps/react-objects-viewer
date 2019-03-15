import React, { Component } from 'react';
import _ from 'lodash'
import Select from '@material-ui/core/Select';
import { PresentationSpanStyle } from './utils/helpers'
import {
  DivStyle, DivBorderedStyle, SelectStyle, InputStyle,
  UnselectableOptions, ActiveStyle,
} from './utils/cssHelpers'
import DelayedInput from './DelayedInput'


class OptionBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: true,
      group: this.props.conf_dgs[0],
      sort: this.props.conf_dgs[1],
      sortOrder: 'asc',
      filter: null,
      filterGroup: this.props.conf_dgs[0],
      groups: [],
      groupsSel: [],
      lastGroupSel: null,
      newObjectsArray: []
    }
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleButtonActClick = this.handleButtonActClick.bind(this)
    this.handleButtonClearClick = this.handleButtonClearClick.bind(this)
    this.handleButtonNoClick = this.handleButtonNoClick.bind(this)
    this.handleButtonAllVisibleClick = this.handleButtonAllVisibleClick.bind(this)
    this.handleButtonAllClick = this.handleButtonAllClick.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleFilterGroupChange = this.handleFilterGroupChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.ObjectsArray !== prevProps.ObjectsArray) {
      this.setGroups()
    }
    if (this.props.activeStatus !== prevProps.activeStatus) {
      this.setGroups()
    }
  }

  Group () {
    let options = []
    let objKeys = []
    if (this.props.ObjectsArray[0]) {
      objKeys = Object.keys(this.props.ObjectsArray[0])
    } else if (this.props.objectKeys) {
      objKeys = this.props.objectKeys
    } else {
      objKeys = [this.state.group]
    }
    for (var i in objKeys) {
      var selected = false
      if (objKeys[i] === this.state.group) {selected='selected'}
      options.push(<option selected={selected}>{objKeys[i]}</option>)
    }

    let selStyle = Object.assign({
    }, SelectStyle())

    return <div style={{height: '40px'}}>
      <select style={selStyle} onChange={this.handleGroupChange}>{options}</select>
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
    let objKeys = []
    if (this.props.ObjectsArray[0]) {
      objKeys = Object.keys(this.props.ObjectsArray[0])
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
      <div style={{height: '40px'}}>
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

  Filter () {
    let options = []
    let objKeys = []
    if (this.props.ObjectsArray[0]) {
      objKeys = Object.keys(this.props.ObjectsArray[0])
    } else if (this.props.objectKeys) {
      objKeys = this.props.objectKeys
    } else {
      objKeys = [this.state.filterGroup]
    }
    for (var i in objKeys) {
      var selected = false
      if (objKeys[i] === this.state.filterGroup) {selected='selected'}
      options.push(<option selected={selected}>{objKeys[i]}</option>)
    }

    let styleComm = {display: 'inline-flex'}
    let inpStyle = Object.assign({}, styleComm, {
      width: '70%'
    })
    let selStyle = Object.assign({}, {
      width: '30%',
    })

    return(
      <div style={{width: '100%', height: '40px', display: 'inline-flex'}}>
        <div style={inpStyle}>
          <DelayedInput onChange={this.handleFilterChange} />
        </div>
        <div style={selStyle}>
          <select style={SelectStyle()} onChange={this.handleFilterGroupChange}>
            {options}
          </select>
        </div>
      </div>
    )
  }

  handleFilterChange (value) {
    let val = value
    this.setState({
      filter: val
    }, this.setGroups)
  }

  handleFilterGroupChange (event) {
    let val = event.target.value
    this.setState({
      filterGroup: val
    }, this.setGroups)
  }

  OtherOptions () {
    var buttons = []
    const groups = this.state.groups
    const groupsSel = this.state.groupsSel

    let optDivStyle = Object.assign({
      display: 'inline-flex',
      width: 'calc(100% / 5)',
      borderStyle: 'solid',
    }, DivStyle(), UnselectableOptions())
    let optDivActiveStyle = Object.assign({
      height:' 40px',
      minHeight: '30px',
    }, optDivStyle, ActiveStyle())


    let actStyle = optDivStyle
    if (this.props.activeStatus) {
      actStyle = optDivActiveStyle
    }

    let allStyle = optDivStyle
    let all = groups.map(function (x) { return x[0] })
    .every(val => groupsSel.includes(val))
    if (groupsSel.length && all) {
      allStyle = optDivActiveStyle
    }

    return (
      <div style={{height: '40px'}}>
        <div style={actStyle}
          onClick={this.handleButtonActClick}>
          ACT
        </div>
        <div style={optDivStyle}
          onClick={this.handleButtonClearClick}>
          Unsel all
        </div>
        <div style={optDivStyle}
          onClick={this.handleButtonNoClick}>
          Unsel vis
        </div>
        <div style={allStyle}
          onClick={this.handleButtonAllVisibleClick}>
          Sel vis
        </div>
        <div style={allStyle}
          onClick={this.handleButtonAllClick}>
          Sel all
        </div>
      </div>
    )
  }

  handleButtonActClick(b) {
    this.props.setBoardActiveStatus()

  }

  handleButtonClearClick(b) {
    this.setState({
      groupsSel: []
    }, this.updateNewObjectsArray)
  }

  handleButtonNoClick(b) {
    let groups = this.state.groups
    let groupsSel = this.state.groupsSel

    let newGroupsSel = _.difference(
      groupsSel,
      groups.map(function (x) { return x[0] })
    )
    this.setState({
      groupsSel: newGroupsSel
    }, this.updateNewObjectsArray)
  }

  handleButtonAllVisibleClick(b) {
    let groups = this.state.groups
    let groupsSel = this.state.groupsSel

    for (let i in groups) {
      var alreadySel = groupsSel.indexOf(groups[i][0])
      if (alreadySel === -1) {
        groupsSel.push(groups[i][0])
      }
    }
    this.setState({
      groupsSel: groupsSel
    }, this.updateNewObjectsArray)
  }

  handleButtonAllClick(b) {
    let groups = this.state.groups
    let groupsSel = this.state.groupsSel

    for (let i in groups) {
      var alreadySel = groupsSel.indexOf(groups[i][0])
      if (alreadySel === -1) {
        groupsSel.push(groups[i][0])
      }
    }
    this.setState({
      groupsSel: groupsSel
    }, this.updateNewObjectsArray)
  }

  handleButtonClick(e, group_k) {
    e.preventDefault()

    let groups = this.state.groups.map(function(x) {return x[0]})
    let groupsSel = this.state.groupsSel

    if (!e.shiftKey) {
      if (groupsSel.includes(group_k)) {
        _.pull(groupsSel, group_k)
      } else {
        groupsSel.push(group_k)
      }
    } else {
      let l = groups.indexOf(this.state.lastGroupSel)
      let c = groups.indexOf(group_k)

      let markedGroups
      if (c > l) {
        markedGroups = groups.slice(l+1, c+1)
      } else {
        markedGroups = groups.slice(c, l)
      }

      if (groupsSel.includes(this.state.lastGroupSel)) {
        for (let m of markedGroups) {
          if (!groupsSel.includes(m)) {
            groupsSel.push(m)
          }
        }
      } else {
        for (let m of markedGroups) {
          if (groupsSel.includes(m)) {
            _.pull(groupsSel, m)
          }
        }
      }
    }

    this.setState({
      groupsSel: groupsSel,
      lastGroupSel: group_k,
    }, this.updateNewObjectsArray)
  }

  handleButtonRightClick(e, group_k) {
    e.preventDefault()
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(group_k)
      }
    });
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
    if (this.props.activeStatus) {
      this.props.sendObjectsArray(this.state.newObjectsArray)
    } else {
      this.props.sendObjectsArray(this.props.ObjectsArray)
    }
  }

  setGroups () {
    var obj = this.props.ObjectsArray
    var group = this.state.group
    var sort = this.state.sort
    var groups = _(obj)
    if (this.state.filter !== null) {
      let filter = this.state.filter
      let filterGroup = this.state.filterGroup
      groups = groups.filter(function (obj) {
        let value = obj[filterGroup]
        if (typeof value === 'string') {}
        else if (typeof value === 'number') {value = value.toString()}
        else {return true}
        console.log(value.match(filter))
        return value.match(filter)
      })
    }
    groups = groups.groupBy(function (o) {return o[group]})
    groups = groups.toPairs()
    groups = groups.orderBy(function (o) {return o[1][0][sort]}, this.state.sortOrder)
    groups = groups.value()
    this.setState({
      groups: groups
    }, this.updateNewObjectsArray)
  }

  Presentation () {
    var buttons = []
    const groups = this.state.groups

    let divStyle = Object.assign(
      DivStyle(), {height: 'auto', minHeight: '30px', borderBottomStyle: 'solid'},
      UnselectableOptions()
    )
    let divActiveStyle = Object.assign(
      {}, divStyle, ActiveStyle()
    )

    for (let g in groups) {
      let group = this.state.group
      let group_k = groups[g][0]
      let style = divStyle
      if (this.state.groupsSel.includes(group_k)) {
        style = divActiveStyle
      }

      let conf_dbd = this.props.conf_dbd
      let descr = []
      if (group in conf_dbd) {
        let conf = conf_dbd[group]
        for (let i of conf) {
          let val = groups[g][1][0][i]
          if (i == '<br/>') {
            descr.push(<br/>)
          } else {
            descr.push(<span style={PresentationSpanStyle(this, i)}>{val} </span>)
          }
        }
      } else {
        descr = <span style={PresentationSpanStyle(this, group_k)}>{group_k} </span>
      }

      buttons.push(
        <div value={group_k}
                style={style}
                onClick={(e) => this.handleButtonClick(e, group_k)}
                onContextMenu={(e) => this.handleButtonRightClick(e, group_k)}>
                {descr}
        </div>
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

    let mainDivStyle = Object.assign(
      DivStyle(), {borderStyle: 'solid'})
    let optGroupDivStyle = Object.assign(
      DivStyle(), {height: '160px'})
    let buttonGroupDivStyle = Object.assign(
      DivStyle(),
      {
        height: '-moz-calc(100% - 160px)',
        height: 'calc(100% - 160px)',
        overflow: 'scroll'
      }
    )

    const mainDiv = <div style={mainDivStyle}>
      <div style={optGroupDivStyle}>
        {this.Group()}
        {this.Sort()}
        {this.Filter()}
        {this.OtherOptions()}
      </div>
      <div style={buttonGroupDivStyle}>
        {this.Presentation()}
      </div>
    </div>
    return mainDiv
  }

}

export default OptionBoard;

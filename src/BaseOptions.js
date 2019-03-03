import React, { Component } from 'react';
import _ from 'lodash'


class BaseOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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

    const mainDiv = <div>
      <div>
        {button1}
        {button2}
      </div>
    </div>
    return mainDiv
  }

}

export default BaseOptions;

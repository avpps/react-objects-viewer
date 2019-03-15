// Za: https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c
import React, { Component } from 'react';
import {
  InputStyle
} from './utils/cssHelpers'

const WAIT_INTERVAL = 2500;
const ENTER_KEY = 13;

export default class DelayedInput extends Component {
    constructor(props) {
        super();

        this.state = {
            value: props.value
        };
        this.triggerChange = this.triggerChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentWillMount() {
        this.timer = null;
    }

    handleChange(e) {
        let value = e.target.value

        clearTimeout(this.timer);

        this.setState({ value });

        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.triggerChange();
        }
    }

    triggerChange() {
        const { value } = this.state;

        this.props.onChange(value);
    }

    render() {
        const { className } = this.props;
        let style = Object.assign({width: '70%'}, InputStyle())
        return (
            <input style={style}
                type={this.props.type}
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
                onKeyDown={(e) => this.handleKeyDown(e)}
            />
        );
    }
}

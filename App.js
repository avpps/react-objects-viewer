import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    let buttons = []

    for (let i=0; i<100; i++) {
      buttons.push(
        <button className="buttonHis">12:00:00:000 aaa_bbb_ccc</button>
      )
    }
    return (
      <div className="divMain">
        <div className="divHeader">
          <button className="buttonMode">MODE</button>
          <button className="buttonLt">FFFF</button>
          <button className="buttonLt">DDDD</button>
          <button className="buttonLt">BBBB</button>
        </div>
        <div className="divWork">
          <div className="divInput">
            <textarea className="textareaInput"/>
          </div>
          <div className="divHistory">
            <div className="divHistoryAll">
              <button className="buttonAll">ALL</button>
            </div>
            <div className="divHistoryButtons">
              {buttons}
            </div>
          </div>
          <div className="divOutput">
            <textarea className="textareaOutput"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    let buttons = []
    for (let i=0; i<100; i++) {
      buttons.push(
        <button className="buttonHis">12:00:00:000 aaa_bbb_ccc</button>
      )
    }

    let buttonsDet = []
    for (let i=0; i<100; i++) {
      buttonsDet.push(
        <button className="buttonDet">aaa-bbb-ccc-ddd-eee</button>
      )
    }
    return (
      <div className="divMain">
        <div className="divInp">
          <div className="divHea">
            <button className="buttonMode">MODE</button>
          </div>
          <div className="divTxa">
            <textarea className="textareaInput"/>
          </div>
        </div>
        <div className="divSum">
          <div className="divHea">
            <button className="buttonLt">FFFF</button>
            <button className="buttonLt">DDDD</button>
            <button className="buttonLt">BBBB</button>
          </div>
          <div className="divBut">
            <div className="divHistoryAll">
              <button className="buttonAll">ALL</button>
            </div>
            <div className="divHistoryButtons">
              {buttons}
            </div>
          </div>
        </div>
        <div className="divDet">
          <div className="divDetHea">
            <div className="divDetHeaBut">
              {buttonsDet}
            </div>
            <div className="divDetHeaAll">
              <button className="buttonAll">All</button>
            </div>
          </div>
          <div className="divDetTxa">
            <textarea className="textareaOutput"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

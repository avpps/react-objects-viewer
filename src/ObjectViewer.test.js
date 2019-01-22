import React from 'react';
import ReactDOM from 'react-dom';
import ObjectViewer from './ObjectViewer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ObjectViewer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

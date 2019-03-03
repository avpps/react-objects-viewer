const backgroundColor = '#1f2223';
const backgroundActiveColor = '#2F393C';
const color = '#7D8C93';
const borderColor = 'grey';
const borderWidth = 'thin';


function CommonStyle () {
  let base = {
    color: color,
    backgroundColor: backgroundColor,
    textAlign: 'center',
    borderColor: borderColor,
    borderWidth: borderWidth,
  };
  return Object.assign(base, );
}


export function DivStyle () {
  let base = {
    height: '100%',
    margin: '0',
  };
  return Object.assign({}, CommonStyle(), base, CommonStyle());
}


export function DivBorderedStyle () {
  let base = {
    borderStyle: 'solid',
  };
  return Object.assign({}, DivStyle(), base, CommonStyle());
}


export function UnselectableOptions () {
  let base = {
    userSelect: 'none',
    msUserSelect: 'none',
    mozUserSelect: 'none',
    khtmlUserSelect: 'none',
    webkitUserSelect: 'none',
    webkitTouchCallout: 'none',
  };
  return Object.assign(base, );
}


export function ParserTextAreaStyle () {
  let base = {
    width: '50%',
    textAlign: 'left',
    height: '100%',
    fontFamily: 'monospace',
    borderStyle: 'solid',
  };
  return Object.assign(CommonStyle(), base);
}


export function ActiveStyle () {
  let base = {
    backgroundColor: backgroundActiveColor,
  };
  return Object.assign(base, );
}


export function SelectStyle () {
  let base = {
    height: '100%',
    width: '100%',
    display: 'inline-flex',
    textAlign: 'left',
  };
  return Object.assign({}, CommonStyle(), base);
}


export function InputStyle () {
  let base = {
    height: '100%',
    width: '100%',
    display: 'inline-block',
    textAlign: 'left',
  };
  return Object.assign({}, CommonStyle(), base);
}

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
    height: 'calc(100%)',
    fontFamily: 'monospace',
    borderStyle: 'solid',
  };
  return Object.assign(CommonStyle(), base);
}


export function ActiveStyle () {
  let base = {
    backgroundColor: '#2F393C',
    color: '#7D8C93'
  };
  return Object.assign(base, );
}


export function ButtonStyle () {
  let base = {
    height: '35px',
    width: '50px',
    display: 'inline-block',
    backgroundColor: '#1f2223',
    color: '#7D8C93',
    borderColor:  borderColor,
  };
  return Object.assign(base, );
}


export function SelectStyle () {
  let base = {
    height: '100%',
    width: '100%',
    display: 'inline-flex',
    backgroundColor:' #1f2223',
    color: '#7D8C93',
    borderColor:  '#2F393C',
  };
  return Object.assign(base, );
}


export function InputStyle () {
  let base = {
    height: '100%',
    width: '97%',
    display: 'inline-block',
    backgroundColor:' #1f2223',
    color: '#7D8C93',
    borderColor:  '#2F393C',
  };
  return Object.assign(base, );
}

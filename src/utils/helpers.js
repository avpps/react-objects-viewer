import _ from 'lodash'


export function PresentationSpanStyle (t, i) {
  let conf_ddc = t.props.conf_ddc
  let spanStyle = {}
  if (i in conf_ddc) {
    spanStyle['color'] = conf_ddc[i]
  }
  return spanStyle;
}

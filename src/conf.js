const conf = {
  'def_group_sort': [
    ['user_id', 'user_id'],
    ['sess_id', 'datetime'],
    ['req_id', 'datetime'],
    ['obj_type', 'obj_type'],
    ['obj_type', 'obj_type'],
  ],
  'def_butt_descr': {
    'user_id': ['user_id'],
    'sess_id': ['datetime', 'user_id', '<br/>', 'sess_id'],
    'req_id': ['datetime', 'req_name', '<br/>', 'req_id', 'sess_id'],
    'obj_type': ['obj_type']
  },
  'def_descr_color': {
    'user_id': '#895b1e',
    'sess_id': 'green',
    'req_id': 'orange',
    'req_name': '#eaf4d3',
    'datetime': '#994636'
  }

}

export function getConf () {
  return conf
}

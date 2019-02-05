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
    'sess_id': ['user_id', 'datetime', 'sess_id'],
    'req_id': ['datetime', 'req_id', 'req_name'],
    'obj_type': ['obj_type']
  }

}

export function getConf () {
  return conf
}

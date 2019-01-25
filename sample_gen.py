import time
import datetime
import json
import random
from string import hexdigits as hd
from pprint import pprint as pp


attributes = [
    'user_id',
    'sess_id',
    'req_id',
    'req_name',
    'obj_type',
    'str_cont',
    'json_cont',
]

req_names = [
    'sign_up',
    'login',
    'get_info',
    'send_message',
    'get_response',
    'logout',
]

obj_types = [
    ['fro', 2],
    ['deb', random.randrange(8, 15, 1)],
    ['bac', random.randrange(0, 6, 1)],
]

objects = list()


def _gen_sample_str_cont(datetime, user_id, sess_id, req_id, req_name, obj_type):
    a = ''.join((random.choice(hd) for i in range(5)))
    b = ''.join((random.choice(hd) for i in range(50)))

    return a + '\n {} {} {} {} {} {} \n'.format(
        datetime, user_id, sess_id, req_id, req_name, obj_type) + b


def _gen_sample_json_cont(datetime, user_id, sess_id, req_id, req_name, obj_type):
    return 'aaa'


dt = datetime.datetime.now()
for u in range(10):
    user_id = random.randrange(1000, 9999, 1)
    dt = dt + datetime.timedelta(hours=random.random(), seconds=random.random())
    for s in range(3):
        dt = dt + datetime.timedelta(hours=random.randrange(-1000, 1000, 1)/100)
        sess_id = 'S_' + ''.join((random.choice(hd) for i in range(15)))
        for req_name in req_names:
            dt = dt + datetime.timedelta(minutes=random.randrange(-1000, 1000, 1) / 100)
            req_id = 'R_' + ''.join((random.choice(hd) for i in range(8)))
            for o in obj_types:
                obj_type = o[0]
                for o_c in range(o[1]):
                    objects.append(dict(
                        datetime=str(dt),
                        user_id=user_id,
                        sess_id=sess_id,
                        req_id=req_id,
                        req_name=req_name,
                        obj_type=obj_type,
                        str_cont=_gen_sample_str_cont(dt, user_id, sess_id,
                                                      req_id, req_name, obj_type),
                        json_cont=_gen_sample_json_cont(datetime, user_id, sess_id,
                                                        req_id, req_name, obj_type)))

print('Object items count: ', len(objects))

file_main_cont = """
export function getSample () {
  return sample
}
"""

file_cont = "const sample = {}\n\n{}".format(str(objects), file_main_cont)

with open('src/SampleObjects.js', 'w') as f:
    f.write(file_cont)


# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
## - call exposes all registered services (none by default)
#########################################################################

import uuid

#todo: move the following to a sepearte module
def get_newid():
    return str(uuid.uuid1())

def construct_parentpath(parent_parentpath, id):
    return '%s/%s' % (parent_parentpath, id)

def extract_parentid(parentpath):
    return parentpath.split('/')[-1]

def newtimeline():
    timelineid = get_newid()
    db.timeline.insert(eid=timelineid)
    # todo
    db.task.insert(eid=timelineid,
                   description = 'root',
                   parentpath = '')
    return (dict(ret ='true', eid = timelineid))

def newtask():
    taskid = get_newid()
        
    parent_rec = db(db.task.eid==request.vars.parentid).select().first()
    parentpath = construct_parentpath(parent_rec.parentpath, parent_rec.eid)                
    # creat new task entry
    # todo
    db.task.insert(eid = taskid, parentpath = parentpath)
    
    # update parentrec
    if (parent_rec.children):
        parent_rec.children.insert(request.vars.idx, taskid)
    else:
        parent_rec.children = [taskid]    
    parent_rec.update_record()
    
    return (dict(ret ='true', eid = taskid))


def gettimeline():
    root = db(db.task.eid == request.vars.eid).select().first()
    parentpath = construct_parentpath(root.parentpath, root.eid)
    task_recs =  db(db.task.parentpath.like(parentpath + '%')).select()
    ret_obj = dict()
    tasktable = dict()
    ret_obj['eid'] = root.eid
    ret_obj['children'] = root.children
    ret_obj['tasktable'] = tasktable
    for task_rec in task_recs:
        task = task_rec.as_dict()
        parentid = extract_parentid(task['parentpath'])
        del task['parentpath']
        task['parentid'] = parentid
        tasktable[task_rec.eid] = task            
    return ret_obj
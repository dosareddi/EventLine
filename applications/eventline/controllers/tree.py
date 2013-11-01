# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations
import json

@request.restful()
def tree():
    response.view = 'generic.json'
    def GET(eid):        
        rows = db(db.tree.eid == eid).select()
        if not rows: raise HTTP(404)
        return json.dumps(rows.first().tree)
                            
    def POST(eid, **fields):
        db.tree.update_or_insert((db.tree.eid == eid), 
                                 eid = eid, tree = fields['tree'])
        return dict()
        
    return locals()

@request.restful()
def treesnips():
    response.view = 'generic.json'
    def GET():
        rows = db(db.tree).select()
        result = []
        for row in rows:            
            result.append(dict(eid = row.tree['eid'], title = row.tree['title']))
        return json.dumps(result)
    
    return locals()

def index():
    return dict()

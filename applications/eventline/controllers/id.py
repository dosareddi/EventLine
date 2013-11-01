# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations
import uuid

@request.restful()
def id():
    def GET():
        return str(uuid.uuid1())
    return locals()
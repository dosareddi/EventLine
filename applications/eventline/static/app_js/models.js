/* Store models here */

/* Eventline Task Model */
function ELTask(eid) {
    this.eid = eid;
    this.parentpath = "";
    this.desc = "Description";
    this.start = null;
    this.end = null;
    this.completed = false;
    this.subtaskIds = [];
}

/* Eventline Tree Model */
function ELTree(eid) {
    this.eid = eid;
    this.title = "Title";   
    this.tasks = {};
    this.tasks[eid] = new ELTask(eid);
};

ELTree.prototype.fromJsonObject = function(jsonObj) {
	// todo: hacky, but works.  Should prob. change it to proper
	// deserializer
	jsonObj.__proto__ = ELTree.prototype;
	return jsonObj;		
};

ELTree.prototype.constructPath = function(parentpath, eid) {
	return parentpath + '/' + eid;	
};

ELTree.prototype.getTask = function(path) {
	var eids = path.split('/');
	return this.tasks[eids[eids.length-1]];
};

ELTree.prototype.addSibling = function(siblingId, newTask) {
    var sibling = this.tasks[siblingId];
    var parent = this.getTask(sibling.parentpath);

    this.tasks[newTask.eid] = newTask;
    newTask.parentpath = sibling.parentpath;

    /* Find the sibling and insert next to it */
    var idx = parent.subtaskIds.indexOf(siblingId);
    parent.subtaskIds.splice(idx+1, 0, newTask.eid);
};

ELTree.prototype.addChild = function(parentId, newTask) {
    var parent = this.tasks[parentId];

    this.tasks[newTask.eid] = newTask;
    newTask.parentpath = this.constructPath(parent.parentpath, parent.eid);

    parent.subtaskIds.splice(0, 0, newTask.eid);
};

ELTree.prototype.delete = function(taskId) {
    var task = this.tasks[taskId];
    var parent = this.getTask(task.parentpath);

    var idx = parent.subtaskIds.indexOf(taskId);
    parent.subtaskIds.splice(idx, 1);

    var toVisit = [];
    toVisit.push(taskId);
    while (toVisit.length > 0) {
        var eid = toVisit.pop();
        if (this.tasks[eid].subtaskIds.length > 0) {
            toVisit.push(this.tasks[eid].subtaskIds);
        }
        delete this.tasks[eid];
    }
};

/* Eventline Task snippet model*/
function ELTaskSnip() {
    this.eid = -1;
    this.title = "Title";
    // this.tasks = [];
}

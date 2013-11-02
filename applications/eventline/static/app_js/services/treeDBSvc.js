/*
 * Interface for accessing and manipulating trees
 */
app.service('treeDBSvc', function ($q, $http) {
    this.taskId = 1;		
    this.getTreeSnips = function(snipFilter) {
        /* TODO: get snippets from the server */
		var d = $q.defer();
		$http.get("/eventline/tree/treesnips").success(function(data) {
			var treesnips = data;//JSON.parse(data);						
			d.resolve(treesnips);
		}).error(function(data, status) {
			d.reject(status);
		});
		return d.promise;               
    };

    this.getNewTaskId = function() {
        return "task" + this.taskId++;
    };

	this.getNewTreeId = function() {		
		var d = $q.defer();
		$http.get("/eventline/id/id").success(function(treeid) {			
			d.resolve(treeid);
		}).error(function(data, status) {
			d.reject(status);
		});
		return d.promise;		
	};
	
    this.getTree = function(eid) {    	
		var d = $q.defer();
		$http.get("/eventline/tree/tree/"+eid).success(function(tree) {			
			d.resolve(ELTree.prototype.fromJsonObject(tree));
		}).error(function(data, status) {
			d.reject(status);
		});
		return d.promise;        
    };

    this.saveTree = function(tree) {    	    	
		var d = $q.defer();
		$http.post("/eventline/tree/tree/" + tree.eid, {'tree' : tree}).success(function(data) {			
			d.resolve();
		}).error(function(data, status) {
			d.reject(status);
		});
		return d.promise;     	     
    };

    this.deleteTree = function(eid) {
        /* TODO: delete tree from server */
    };
});
treeCtrl = app.controller("treeCtrl", function($scope, $routeParams, treeData, treeDBSvc) {
    $scope.tree = treeData;
	
    $scope.addSiblingTask = function(siblingId) {
        var taskId = treeDBSvc.getNewTaskId();
        var newTask = new ELTask(taskId);
        $scope.tree.addSibling(siblingId, newTask);
    };

    $scope.addChildTask = function(parentId) {
        var taskId = treeDBSvc.getNewTaskId();
        var newTask = new ELTask(taskId);
        $scope.tree.addChild(parentId, newTask);
    };

    $scope.deleteTask = function(taskId) {
        $scope.tree.delete(taskId);
    };

    /* To save the tree */
    $scope.save = function() {        
        treeDBSvc.saveTree($scope.tree);        
    };

});

treeCtrl.loadTree = function($route, treeDBSvc) {
	var eid = $route.current.params.eid;
	var promise;
	if (eid == -1) {
		promise = treeDBSvc.getNewTreeId().then(
			function(treeid) { // success
				var tree = new ELTree(treeid);
				tree.title = "Enter Title";
				tree.addChild(tree.eid, new ELTask(treeDBSvc.getNewTaskId()));
				console.log("loadTree: rcvd treeid " + treeid);
				return tree; 
			},
			function(status) { // failure
				throw "Failure to get treeid. Status: " + status;
			}
		);		
	} else {
		promise = treeDBSvc.getTree(eid).then(
			function(tree) { // success
				console.log("loadTree: rcvd tree");				
				return tree; 
			},
			function(status) { // failure
				throw "Failure to get tree. Status: " + status;
			}
		);				
	}
	return promise;	
};

treeSnipsCtrl = app.controller('treeSnipsCtrl', function ($scope, treeSnipsData, treeDBSvc) {
    $scope.data = {
        treeSnips: treeSnipsData
    };
});

treeSnipsCtrl.loadTreeSnips = function($route, treeDBSvc) {
	// todo: set the filter from the route
	var filter;
	var promise = treeDBSvc.getTreeSnips(filter).then(function(treeSnips) {// success		
		return treeSnips;
	}, function(status) {// failure
		throw "Failure to get tree snips. Status: " + status;
	});
	return promise;
};

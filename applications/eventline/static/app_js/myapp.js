var app = angular.module('myApp', ['xeditable']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/tree/:eid',
        {
            controller: 'treeCtrl',
            templateUrl: '/eventline/static/app_js/partials/tree.html',
            resolve: {
            	treeData: treeCtrl.loadTree
            }
        })
        .when('/treesnips',
        {
            controller: 'treeSnipsCtrl',
            templateUrl: '/eventline/static/app_js/partials/treesnips.html',
            resolve: {
            	treeSnipsData: treeSnipsCtrl.loadTreeSnips
            }
        })
        .otherwise({ redirectTo: '/treesnips' });
});

app.run(function(editableOptions) {
    editableOptions.theme = 'bs2'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

angular.module('mica.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    //// Form data for the login modal
    //$scope.loginData = {};

    //// Create the login modal that we will use later
    //$ionicModal.fromTemplateUrl('templates/login.html', {
    //  scope: $scope
    //}).then(function(modal) {
    //  $scope.modal = modal;
    //});

    //// Triggered in the login modal to close it
    //$scope.closeLogin = function() {
    //  $scope.modal.hide();
    //};

    //// Open the login modal
    //$scope.login = function() {
    //  $scope.modal.show();
    //};

    //// Perform the login action when the user submits the login form
    //$scope.doLogin = function() {
    //  console.log('Doing login', $scope.loginData);

    //  // Simulate a login delay. Remove this and replace with your login
    //  // code if using a login system
    //  $timeout(function() {
    //    $scope.closeLogin();
    //  }, 1000);
    //};

    $ionicModal.fromTemplateUrl('templates/restaurante/addRestaurante.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });


})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
})

.controller('RestauranteCtrl', function ($scope, $stateParams) {
})

.controller('RestaurantesCtrl', function ($scope, $ionicModal, $stateParams) {
    const restaurantListConst = 'restaurantListConst';
    $scope.restaurantes = [];
    $scope.restauranteData = {};

    // Define item buttons
    $scope.itemButtons = [{
        text: 'Delete',
        type: 'button-assertive',
        onTap: function (item) {
            alert();
            //$scope.removeItem(item);
        }
    }, {
        text: 'Edit',
        type: 'button-calm',
        onTap: function (item) {
            //$scope.showEditItem(item);
            alert();
        }
    }];

    $scope.closeAddRestaurante = function () {
        $scope.modal.hide();
    };

    $scope.loadRestaurantesList = function () {
        if (window.localStorage[restaurantListConst] != null) {
            
            $scope.restaurantes = JSON.parse(window.localStorage[restaurantListConst] || '{}');;
            
        }
        else {
            $scope.restaurantes = [
                { Nome: 'um', id: 1, Cozinha: "Burger" },
                { Nome: 'dois', id: 2, Cozinha: "Japones" },
                { Nome: 'tres', id: 3, Cozinha: "Italiano" },
                { Nome: 'quatro', id: 4, Cozinha: "Burger" }
            ];
        }  
    };

    $scope.addRestaurante = function (edit) {
        $scope.isEdit = edit;
        var app = angular.module('mica', ['ionic', 'mica.controllers']);
        
        $scope.modal.show();
        $scope.isEdit = edit;
    };

    $scope.edit = function () {
        $scope.restauranteData.Nome = "vamos ver";
        $scope.restauranteData.Cozinha = "aaaaa";
        $scope.restauranteData.id = 20;
        $scope.modal.show();
    };

    $scope.deleteRestaurante = function (id) {
        var idDelete = 0;
        for (var i = 0; i < $scope.restaurantes.length; i++) {
            if ($scope.restaurantes[i].id == id) {
                $scope.restaurantes.splice(i, 1);
                continue;
            }
        }

        window.localStorage[restaurantListConst] = JSON.stringify($scope.restaurantes);
    };
    

    $scope.refreshList = function () {
        $scope.restaurantes = JSON.parse(window.localStorage[restaurantListConst] || '{}');;
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.saveRestaurante = function () {
        var highestId = 0;
        for (var i = 0; i < $scope.restaurantes.length; i++) {
            if ($scope.restaurantes[i].id > highestId) {
                highestId = $scope.restaurantes[i].id;
            }
        }
        highestId++;

        var novoRestaurante =
        {
            Nome: $scope.restauranteData.Nome
            , id: highestId
            , Cozinha: $scope.restauranteData.Cozinha
        };

        $scope.restaurantes.push(novoRestaurante);
        window.localStorage[restaurantListConst] = JSON.stringify($scope.restaurantes);

        $scope.closeAddRestaurante();
    };

    $scope.teste = function (obj) {
        alert(obj);
        $scope.edit();
    }


    // Doc Ready
    if ($scope.restaurantes.length == 0) {
        $scope.loadRestaurantesList();
    }
});
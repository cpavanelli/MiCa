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
    $scope.novoRestaurante = {};

    //alert($scope.novoRestaurante);
    //if ($scope.novoRestaurante != null) {
    //    $scope.restaurantes.push($scope.novoRestaurante);
    //    $scope.novoRestaurante = null;
    //}

    //alert($scope.novoRestaurante);
   

  //  $scope.restaurantes = [
  //{ Nome: 'um', id: 1, Cozinha: "Burger" },
  //{ Nome: 'dois', id: 2, Cozinha: "Japones" },
  //{ Nome: 'tres', id: 3, Cozinha: "Italiano" },
  //{ Nome: 'quatro', id: 4, Cozinha: "Burger" }
  //  ];
 
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

    $scope.addRestaurante = function () {
        $scope.modal.show();
    };

    $scope.refreshList = function () {
        $scope.restaurantes = JSON.parse(window.localStorage[restaurantListConst] || '{}');;
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.saveRestaurante = function () {
        $scope.novoRestaurante =
        {
            Nome: $scope.restauranteData.Nome
            , id: 0
            , Cozinha: $scope.restauranteData.Cozinha
        };

        $scope.restaurantes.push($scope.novoRestaurante);
        window.localStorage[restaurantListConst] = JSON.stringify($scope.restaurantes);

        $scope.closeAddRestaurante();
    };

    if ($scope.restaurantes.length == 0) {
        $scope.loadRestaurantesList();
    }
});

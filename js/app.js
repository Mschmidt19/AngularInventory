/**
 * Created by Administrator on 2/11/2015.
 */

var myApp = angular.module('myApp', ['firebase', 'ngRoute', 'gameControllers', 'ngAnimate', 'ui.sortable', 'myAppFilters']);


myApp.controller('CategoryController', ['$rootScope','$scope', '$firebase', '$http', '$sce', function($rootScope, $scope, $firebase, $http, $sce) {


    var ref = new Firebase("https://angularprojectpos.firebaseio.com");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object


    $scope.myGamesList = sync.$asArray();

    $scope.addGame=function(){
        $scope.myGamesList.$add($scope.newGame);

        $scope.newGame={};
    };


    $rootScope.showmeLight = false;
    $rootScope.darken = true;


    $scope.nameSize = function(nameLength) {

        if (nameLength < 18) {
            return '18px';
        }
        else if (nameLength >= 18 && nameLength <= 20) {
            return '16px';
        }
        else if (nameLength >= 21 && nameLength <= 25) {
            return '14.5px';
        }
        else if (nameLength > 25 && nameLength <= 32) {
            return '13px';
        }
        else { //nameLength >32
            return '9px';
        }
    };

    $scope.salesNameSize = function(nameLength) {

        if (nameLength < 9) {
            return '18px';
        }
        else if (nameLength >= 9 && nameLength <= 13) {
            return '17px';
        }
        else if (nameLength >= 14 && nameLength <= 16) {
            return '16px';
        }
        else if (nameLength >= 17 && nameLength <= 18) {
            return '14.5px';
        }
        else if (nameLength >= 19 && nameLength <= 23) {
            return '12.5px';
        }
        else if (nameLength >= 24 && nameLength <= 38) {
            return '10px';
        }
        else { //nameLength >32
            return '8px';
        }
    };



    $scope.catSearch = function(category) {
        if (category || category != '') {
            return true;
        }
        return false;
    };


    $scope.random = function(){
        return 0.5 - Math.random();
    };


    $scope.urlToNumb = function(urlPart) {
        switch(urlPart){
            case '/0':
                return 0;
                break;
            case '/1':
                return 1;
                break;
            case '/2':
                return 2;
                break;
            case '/3':
                return 3;
                break;
            case '/4':
                return 4;
                break;
            case '/5':
                return 5;
                break;
            case '/6':
                return 6;
                break;
            case '/7':
                return 7;
                break;
            case '/8':
                return 8;
                break;
            case '/9':
                return 9;
                break;
            default:
                return Number(urlPart);
                break;
        }
    };


    $rootScope.deleteSlash = function(urlPart){
        if (urlPart[0] == '/'){
            return urlPart[1];
        }
        else{
            return urlPart;
        }
    };

    $scope.setItemIdToUrl = function(){
        alert("did it");
        $rootScope.itemId = deleteSlash(document.URL.substring(document.URL.length - 2, document.URL.length));
        $rootScope.apply();
        console.log($rootScope.itemId);
        alert("did it 2");
    };


    $rootScope.cartArray = [];

    $rootScope.itemId = null;



    $scope.html = getStars(gameArray[2]);
    $scope.trustedHtml = $sce.trustAsHtml($scope.html);

    $scope.trustHtml = function(something) {
        return $sce.trustAsHtml(something);
    };

    $scope.getTrustedHtml = function(game) {
        // get the game HTML
        var html = $scope.getStars(game);
        // Return it as trusted HTML for ngBindHtml
        return $sce.trustAsHtml(html);
    };



    $scope.getStars = function(game) {
        var numStars = (game.numberStars);
        iconString = '';
        for (i=0; i<Math.floor(numStars); i++) {
            iconString += '<img style="width:16px" class="starGlyph" src="images/fullStar.png" alt=""/>'
        }
        if (numStars%1 == 0.5) {
            iconString += '<img style="width:16px" class="starGlyph" src="images/halfStar.png" alt=""/>'
        }
        for (j=0; j<(5-Math.ceil(numStars)); j++) {
            iconString += '<img style="width:16px" class="starGlyph" src="images/emptyStar.png" alt=""/>'
        }
        return iconString;
    };


    /*$scope.iconStarArray = [];

     $scope.getStars2 = function(game) {
     var numStars = (game.numberStars);
     iconStringArray = [];
     for (i=0; i<Math.floor(numStars); i++) {
     iconStringArray.push("images/fullStar.png")
     }
     if (numStars%1 == 0.5) {
     iconStringArray.push("images/halfStar.png")
     }
     for (j=0; j<(5-Math.ceil(numStars)); j++) {
     iconStringArray.push("images/emptyStar.png")
     }
     $scope.iconStarArray = iconStringArray;
     };*/



    $scope.switchToLoggedIn = function() {
        $("#logInButton").hide();
        $("#LogInDiv").hide();
        $("#myCartButton").show();
        $("#logOutButton").show();
    };


    $scope.switchToLoggedOut = function() {
        $("#myCartButton").hide();
        $("#logOutButton").hide();
        $("#logInButton").show();
        $("#LogInDiv").show();
    };




}]);

myApp.config(['$routeProvider', function($routeProvider) {


    $routeProvider.when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    }).
        when('/All_Games', {
            templateUrl: 'partials/All_Games.html',
            controller: 'CategoryController'
        }).
        when('/MOBA_Games', {
            templateUrl: 'partials/MOBA_Games.html',
            controller: 'CategoryController'
        }).
        when('/Strategy_Games', {
            templateUrl: 'partials/Strategy_Games.html',
            controller: 'CategoryController'
        }).
        when('/MMORPG_Games', {
            templateUrl: 'partials/MMORPG_Games.html',
            controller: 'CategoryController'
        }).
        when('/RPG_Games', {
            templateUrl: 'partials/RPG_Games.html',
            controller: 'CategoryController'
        }).
        when('/Action_and_Adventure_Games', {
            templateUrl: 'partials/Action_and_Adventure_Games.html',
            controller: 'CategoryController'
        }).
        when('/Shooter_Games', {
            templateUrl: 'partials/Shooter_Games.html',
            controller: 'CategoryController'
        }).
        when('/Indie_Games', {
            templateUrl: 'partials/Indie_Games.html',
            controller: 'CategoryController'
        }).
        when('/Sports_and_Racing_Games', {
            templateUrl: 'partials/Sports_and_Racing_Games.html',
            controller: 'CategoryController'
        }).
        when('/Simulation_Games', {
            templateUrl: 'partials/Simulation_Games.html',
            controller: 'CategoryController'
        }).
        when('/details/:itemId', {
            templateUrl: 'partials/details.html',
            controller: 'DetailsController'
        }).
        when('/myCart', {
            templateUrl: 'partials/myCart.html',
            controller: 'cartController'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);




var urlToNumb = function(urlPart) {
    switch(urlPart){
        case '/0':
            return 0;
            break;
        case '/1':
            return 1;
            break;
        case '/2':
            return 2;
            break;
        case '/3':
            return 3;
            break;
        case '/4':
            return 4;
            break;
        case '/5':
            return 5;
            break;
        case '/6':
            return 6;
            break;
        case '/7':
            return 7;
            break;
        case '/8':
            return 8;
            break;
        case '/9':
            return 9;
            break;
        default:
            return Number(urlPart);
            break;
    }
};


var deleteSlash = function(urlPart){
    if (urlPart[0] == '/'){
        return urlPart[1];
    }
    else{
        return urlPart;
    }
};



var getStars = function(game) {
    var numStars = (game.numberStars);
    iconString = '';
    for (i=0; i<Math.floor(numStars); i++) {
        iconString += '<img style="width:16px" class="starGlyph" src="images/fullStar.png" alt=""/>'
    }
    if (numStars%1 == 0.5) {
        iconString += '<img style="width:16px" class="starGlyph" src="images/halfStar.png" alt=""/>'
    }
    for (j=0; j<(5-Math.ceil(numStars)); j++) {
        iconString += '<img style="width:16px" class="starGlyph" src="images/emptyStar.png" alt=""/>'
    }
    return iconString;
};


var getStars2 = function(game) {
    var numStars = (game.numberStars);
    iconStringArray = [];
    for (i=0; i<Math.floor(numStars); i++) {
        iconStringArray.push("images/fullStar.png")
    }
    if (numStars%1 == 0.5) {
        iconStringArray.push("images/halfStar.png")
    }
    for (j=0; j<(5-Math.ceil(numStars)); j++) {
        iconStringArray.push("images/emptyStar.png")
    }
    return iconStringArray;
};


gameArray = [{"banner":"http://i.imgur.com/DHOKAGl.png","category":"MOBA","coop_TF":"False","description":"League of Legends is a fast-paced, competitive online game that blends the speed and intensity of an RTS with RPG elements. Two teams of powerful champions, each with a unique design and playstyle, battle head-to-head across multiple battlefields and game modes. With an ever-expanding roster of champions, frequent updates and a thriving tournament scene, League of Legends offers endless replayability for players of every skill level.","developer":"Riot Games","mac_TF":"True","max_local_players":"1","name":"League of Legends","numberReviews":37,"numberStars":4,"online_TF":"True","price":"$0.00","subscription_TF":"False","thumbnail":"http://i.imgur.com/Ul5pphA.jpg","windows_TF":"True","$id":"-Jhtzl1zT83Dg2r8sEEs","$priority":null},{"banner":"http://i.imgur.com/Y3bKQEh.jpg","category":"MOBA","coop_TF":"False","description":"Dota is a competitive game of action and strategy, played both professionally and casually by millions of passionate fans worldwide. Players pick from a pool of over a hundred heroes, forming two teams of five players.","developer":"Valve","mac_TF":"True","max_local_players":"1","name":"DOTA 2","numberReviews":32,"numberStars":4.5,"online_TF":"True","price":"$0.00","subscription_TF":"False","thumbnail":"http://i.imgur.com/7RYOtnR.jpg","windows_TF":"True","$id":"-Jhu-XFo0xdP3QQ2NAuI","$priority":null},{"banner":"http://i.imgur.com/4hKl8qE.jpg","category":"MOBA","coop_TF":"False","description":"Heroes of Newerth pits two teams of players against each other: the Legion and the Hellbourne. Both teams are based at opposite corners of the map in their respective bases. Bases consist of buildings, creep spawn points, towers, a hero spawning pool, and a central structure. The goal of the game is to either destroy the central structure, the World Tree (Legion) or Sacrificial Shrine (Hellbourne), of the opposite base or force the other team to concede. Players achieve this by selecting heroes with unique skills to combat the other team.","developer":"S2 Games","mac_TF":"True","max_local_players":"1","name":"Heroes of Newerth","numberReviews":12,"numberStars":3.5,"online_TF":"True","price":"$0.00","subscription_TF":"False","thumbnail":"http://i.imgur.com/Y85pIeF.jpg","windows_TF":"True","$id":"-Jhu-zRL9sazKwC-0JyI","$priority":null}];




$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 420) {
        $('#toTopArrow').fadeIn();
    } else {
        $('#toTopArrow').fadeOut();
    }

});


$("#toTopArrow").on("click",function(){
    $('html, body').animate({scrollTop:0}, 'slow');
});

/*
 $('a[href=#top]').click(function(){
 $('html, body').animate({scrollTop:0}, 'slow');
 });*/

$("#logo").mouseenter(function (){
    $(this).addClass("tada")
});

$("#logo").mouseleave(function (){
    $(this).removeClass("tada")
});




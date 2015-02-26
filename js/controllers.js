/**
 * Created by Administrator on 2/16/2015.
 */

var gameControllers = angular.module('gameControllers', ['firebase']);

gameControllers.controller('CategoryController', ['$rootScope', '$scope', '$firebase', '$http', '$sce', function($rootScope, $scope, $firebase, $http, $sce) {

    var ref = new Firebase("https://angularprojectpos.firebaseio.com");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object


    $scope.myGamesList = sync.$asArray();


    $scope.addGame=function(){
        $scope.myGamesList.$add($scope.newGame);

        $scope.newGame={};
    };




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

    $scope.deleteSlash = function(urlPart){
        if (urlPart[0] == '/'){
            return urlPart[1];
        }
        else{
            return urlPart;
        }
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


}]);





gameControllers.controller('DetailsController', ['$rootScope', '$scope', '$http', '$routeParams', '$firebase', function($rootScope, $scope, $http, $routeParams, $firebase) {

    var ref = new Firebase("https://angularprojectpos.firebaseio.com");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object

    $scope.myGamesList = sync.$asArray();

    $scope.whichItem = $routeParams.itemId;

    $scope.catSearch = function(category) {
        if (category || category != '') {
            return true;
        }
        return false;
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

    $scope.deleteSlash = function(urlPart){
        if (urlPart[0] == '/'){
            return urlPart[1];
        }
        else{
            return urlPart;
        }
    };

    $scope.getPlatform = function(game){
        if (game.windows_TF == 'True' && game.mac_TF == 'True'){
            return 'Available on Windows and Mac OS X'
        }
        else if (game.windows_TF == 'True' && game.mac_TF == 'False') {
            return 'Only Available on Windows'
        }
        else if (game.windows_TF == 'False' && game.mac_TF == 'True') {
            return 'Only Available on Mac OS X'
        }
        else {
            return 'Not Available'
        }
    };

    $scope.addToCart = function(addedGame){
        if($rootScope.cartArray.indexOf(addedGame) == -1) {
            $rootScope.cartArray.push(addedGame);
            alert('Added!');
        }
        else {
            alert('Game Already In Cart!');
        }
    };


    $scope.setItemIdToUrl = function(){
        alert("did it");
        $rootScope.itemId = deleteSlash(document.URL.substring(document.URL.length - 2, document.URL.length));

        console.log($rootScope.itemId);
        alert("did it 2");
        $rootScope.$digest();
    };


}]);



gameControllers.controller('HomeController', ['$rootScope', '$scope', '$http', '$routeParams', '$firebase', function($rootScope, $scope, $http, $routeParams, $firebase) {

    var ref = new Firebase("https://angularprojectpos.firebaseio.com");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object

    $scope.myGamesList = sync.$asArray();

    $scope.catSearch = function (category) {
        if (category || category != '') {
            return true;
        }
        return false;
    };



    $scope.myRandomGamesList = [{"banner":"http://i.imgur.com/O9MEjcq.jpg","category":"Strategy","coop_TF":"False","description":"You are Sarah Kerrigan, former Queen of Blades. Once the most feared entity in the galaxy, you now wait in a cell in the depths of a high-security research laboratory. Before the murderous forces of the Terran Dominion close in, you must plot your escape to the dark reaches of space… and reclaim your living empire at the Heart of the Swarm.","developer":"Blizzard Entertainment","mac_TF":"True","max_local_players":"1","name":"StarCraft II: Heart of the Swarm","numberReviews":68,"numberStars":4,"online_TF":"True","price":"$19.99","subscription_TF":"False","thumbnail":"http://i.imgur.com/jC3Vqzz.jpg","windows_TF":"True","$id":"-Jhu1o8nZYXOHyEDvVn3","$priority":null},
        {"banner":"http://i.imgur.com/ytnTgwA.jpg","category":"RPG","coop_TF":"True","description":"Dark Souls II brings the franchise’s renowned difficulty & gripping gameplay innovations to both single and multiplayer experiences.","developer":"From Software","mac_TF":"False","max_local_players":"1","name":"Dark Souls II","numberReviews":36,"numberStars":4.5,"online_TF":"True","price":"$46.97","subscription_TF":"False","thumbnail":"http://i.imgur.com/JESzm8M.png","windows_TF":"True","$id":"-JhurKBXWbpGAw3ZmrMw","$priority":null},
        {"banner":"http://i.imgur.com/i5rJz2w.jpg","category":"Action & Adventure","coop_TF":"False","description":"Initially conceived as a floating symbol of American ideals at a time when the United States was emerging as a world power, Columbia is sent to distant shores with great fanfare by a captivated public. What begins as a fresh new endeavor of hope turns drastically wrong as the city soon disappears into the clouds to whereabouts unknown. The player takes on the role of former Pinkerton agent Booker DeWitt, sent to the lost city to rescue Elizabeth, a young lady imprisoned there since her childhood. He develops a relationship with Elizabeth, enhancing his abilities with hers so the pair may escape from a city that is literally falling from the sky. DeWitt has to learn to fight foes in high-speed Sky-Line battles, engage in combat both indoors and amongst the clouds, and harness the power of a myriad of new weapons and abilities.","developer":"2K Games","mac_TF":"True","max_local_players":"1","name":"BioShock Infinite","numberReviews":68,"numberStars":4.5,"online_TF":"False","price":"$59.99","subscription_TF":"False","thumbnail":"http://i.imgur.com/z2J7ntF.jpg","windows_TF":"True","$id":"-JhuuiCwdZRrYY8Yn8ob","$priority":null},
        {"banner":"http://i.imgur.com/oIgXFVu.png","category":"Shooter","coop_TF":"False","description":"Battlefield 4 is an action blockbuster that aims for unrivaled destruction. Fueled by Frostbite 3, Battlefield 4 allows you to demolish the buildings shielding your enemy. You will lead an assault from the back of a gun boat. Battlefield grants you the freedom to do more and be more while playing to your strengths and carving your own path to victory. Beyond its hallmark multiplayer, Battlefield 4 features an intense, dramatic character-driven campaign that starts with the evacuation of American VIPs from Shanghai and follows your squad's struggle to find its way home. Change the landscape in real-time with interactive environments that react to your every move. Dominate land, air and sea with all-new, intense water-based vehicular combat.","developer":"EA Digital Illusions CE","mac_TF":"True","max_local_players":"1","name":"Battlefield 4","numberReviews":18,"numberStars":4,"online_TF":"True","price":"$29.99","subscription_TF":"False","thumbnail":"http://i.imgur.com/4jqv7Df.jpg","windows_TF":"True","$id":"-Jhuvdim5YMdGye1c7La","$priority":null},
        {"banner":"http://i.imgur.com/0KePbnU.jpg","category":"Sports & Racing","coop_TF":"False","description":"Cut-throat multiplayer running game that pits 4 players against each other, locally and/or online. Run, jump, swing around, and use devious weapons and pick-ups to knock opponents off-screen!","developer":"DoubleDutch Games","mac_TF":"False","max_local_players":"4","name":"SpeedRunners","numberReviews":31,"numberStars":4,"online_TF":"True","price":"$9.99","subscription_TF":"False","thumbnail":"http://i.imgur.com/9hk3Qhr.jpg","windows_TF":"True","$id":"-Jhux7iyXatr2UqBkgCU","$priority":null},
        {"banner":"http://i.imgur.com/TazOuVE.jpg","category":"Simulation","coop_TF":"False","description":"Goat Simulator is the latest in goat simulation technology, bringing next-gen goat simulation to YOU. You no longer have to fantasize about being a goat, your dreams have finally come true! WASD to write history. Gameplay-wise, Goat Simulator is all about causing as much destruction as you possibly can as a goat. It has been compared to an old-school skating game, except instead of being a skater, you're a goat, and instead of doing tricks, you wreck stuff. Destroy things with style, such as doing a backflip while headbutting a bucket through a window, and you'll earn even more points! Or you could just give Steam Workshop a spin and create your own goats, levels, missions, and more! When it comes to goats, not even the sky is the limit, as you can probably just bug through it and crash the game.","developer":"Coffee Stain Studios","mac_TF":"True","max_local_players":"1","name":"Goat Simulator","numberReviews":39,"numberStars":3,"online_TF":"False","price":"$9.99","subscription_TF":"False","thumbnail":"http://i.imgur.com/MY8Kh5v.jpg","windows_TF":"True","$id":"-JhuyGOXoUGGjOs-eGJT","$priority":null}];



    $scope.random = function () {
        return 0.5 - Math.random();
    };

    $scope.nameSize = function (nameLength) {

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

    $scope.salesNameSize = function (nameLength) {

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


    $scope.urlToNumb = function (urlPart) {
        switch (urlPart) {
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

    $scope.deleteSlash = function (urlPart) {
        if (urlPart[0] == '/') {
            return urlPart[1];
        }
        else {
            return urlPart;
        }
    };
}]);


gameControllers.controller('cartController', ['$rootScope', '$scope', '$http', '$routeParams', '$firebase', function($rootScope, $scope, $http, $routeParams, $firebase) {

    var ref = new Firebase("https://angularprojectpos.firebaseio.com");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object

    $scope.myGamesList = sync.$asArray();

    $scope.catSearch = function(category) {
        if (category || category != '') {
            return true;
        }
        return false;
    };




    $scope.random = function(){
        return 0.5 - Math.random();
    };

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

    $scope.deleteSlash = function(urlPart){
        if (urlPart[0] == '/'){
            return urlPart[1];
        }
        else{
            return urlPart;
        }
    };



    $scope.removeFromCart = function(removedGame) {
        index = $rootScope.cartArray.indexOf(removedGame);
        $rootScope.cartArray.splice(index, 1);
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


    $scope.computeSubTotal = function(cartArray){
        var subTotal = 0;
        for(game in cartArray){
            subTotal += Number((cartArray[game].price).substring(1, (cartArray[game].price).length));
        }
        return subTotal;
    };



}]);

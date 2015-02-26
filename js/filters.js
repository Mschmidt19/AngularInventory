/**
 * Created by Administrator on 2/16/2015.
 */


var myAppFilters = angular.module('myAppFilters', []);


myAppFilters.filter('removeSubName', function(){
    //Need at least one parameter
    return function(gameName){

        //Everything after is just logic for the filter

        var shortenedName= gameName.substr(0, gameName.indexOf(':'));

        //It needs to return something
        if (gameName.indexOf(':') == -1){
            return gameName;
        }
        else{
            return shortenedName;
        }
    }
});



myAppFilters.filter('priceStringToFloat', function(){
    //Need at least one parameter
    return function(gamePrice){

        //Everything after is just logic for the filter

        var intStr = gamePrice.substr(1, gamePrice.length);

        return parseFloat(intStr);
    }
});
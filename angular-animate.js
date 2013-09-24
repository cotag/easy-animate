/**
*    CoTag AngularJS Animation Utility
*    Utilises promises to simplify the animation process in angular
*    
*   Copyright (c) 2013 CoTag Media.
*    
*    @author     Stephen von Takach <steve@cotag.me>
*    @copyright  2013 cotag.me
* 
*     
*     References:
*        * 
*
**/

(function (angular) {
    'use strict';

    angular.module('coAnimate', []).
        factory('$animation', ['$window', '$q', function ($window, $q) {
            var animating,
                callback = function () {
                    animating.resolve(true);
                    animating = undefined;
                };

            return function () {
                if (animating === undefined) {
                    animating = $q.defer();
                    $window.requestAnimationFrame(callback);
                }

                return animating.promise;
            };
        }]);

}(this.angular));

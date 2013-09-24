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

        // Chain functions that are synced to frames
        factory('$nextFrame', ['$window', '$q', function ($window, $q) {
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
        }]).

        // Custom animations with updateable settings
        factory('$animation', ['$window', '$q', '$nextFrame', function ($window, $q, $nextFrame) {
            return function (apply, compute) {
                var idle = true,
                    callback = function () {
                        idle = true;
                        compute();
                    };

                return function (update) {
                    update = update || apply;
                    update();
                    if (idle) {
                        idle = false;
                        $nextFrame().then(callback);
                    }
                };
            };
        }]);

}(this.angular));

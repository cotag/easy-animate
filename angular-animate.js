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
        factory('$animation', ['$nextFrame', function ($nextFrame) {
            return function (apply, compute) {
                var scratch = {},
                    idle = true,
                    callback = function () {
                        if (idle === false) {
                            idle = true;
                            compute.call(scratch);
                        }
                    },
                    animate = function () {
                        var result = apply.apply(scratch, arguments);

                        // Don't animate if the apply function returns false
                        if (idle === true && result !== false) {
                            idle = false;
                            $nextFrame().then(callback);
                        }
                    };

                animate.is_idle = function () {
                    return idle;
                };
                
                animate.refresh = function () {
                    if (idle === true) {
                        idle = false;
                        $nextFrame().then(callback);
                    }
                };
                
                animate.cancel = function () {
                    idle = true;
                };

                return animate;
            };
        }]);

}(this.angular));

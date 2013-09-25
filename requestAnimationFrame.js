/**
*    CoTag Animation Frame Polyfill
*    Provides a consistent api across browsers with no, partial and prefixed support
*    
*   Copyright (c) 2013 CoTag Media.
*    
*    @author     Stephen von Takach <steve@cotag.me>
*    @copyright  2013 cotag.me
* 
*     
*     References:
*        * https://gist.github.com/paulirish/1579671
*
**/


(function (window) {
    'use strict';

    var lastTime = 0,
        vendors = ['moz', 'webkit', 'o', 'ms'],
        x;

    // Remove vendor prefixing if prefixed and break early if not
    for (x = 0; x < vendors.length && !window.requestAnimationFrame; x += 1) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                   || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    // Check if full standard supported
    if (window.cancelAnimationFrame === undefined) {
        // Check if standard partially supported
        if (window.requestAnimationFrame === undefined) {
            // No support, emulate standard
            window.requestAnimationFrame = function (callback) {
                var now = new Date().getTime(),
                    // +16 ~ 60fps, +32 ~ 31fps
                    // Went with 30fps for older slower browsers / devcie support
                    nextTime = Math.max(lastTime + 32, now);

                return window.setTimeout(function () { callback(lastTime = nextTime); }, nextTime - now);
            };

            window.cancelAnimationFrame = window.clearTimeout;
        } else {
            // Emulate cancel for browsers that don't support it
            vendors = window.requestAnimationFrame;
            lastTime = {};

            window.requestAnimationFrame = function (callback) {
                var id = x; // Generate the id (x is initialized in the for loop above)
                x += 1;
                lastTime[id] = callback;

                // Call the vendors requestAnimationFrame implementation
                vendors(function (timestamp) {
                    if (lastTime.hasOwnProperty(id)) {
                        var error;
                        try {
                            lastTime[id](timestamp);
                        } catch (e) {
                            error = e;
                        } finally {
                            delete lastTime[id];
                            if (error) { throw error; }         // re-throw the error if an error occurred
                        }
                    }
                });

                // return the id for cancellation capabilities
                return id;
            };

            window.cancelAnimationFrame = function (id) {
                delete lastTime[id];
            };
        }
    }

}(this));

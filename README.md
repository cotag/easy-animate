# requestAnimationFrame polyfill

Based on code from https://gist.github.com/paulirish/1579671

1. Open bower.json
2. Add `"easy-animate": "~1.1.0"` to your dependency list
3. Run `bower install`
4. In your application you can now add:
   * `<script src="components/easy-animate/requestAnimationFrame.js"></script>`
   * `<script src="components/easy-animate/angular-animate.js"></script>`


## AngularJS Usage

The utility wraps a single call request animation frame in a promise that is resolved by the animation triggering.
Add `coAnimate` to your apps module dependancy list then use it as a service

```javascript
    $animation().then(function() {
        // animate here
    });
```

or in the middle of a promise chain

```javascript
    $http.get(asset)
        .then($animation())
        .then(function() {
            // animate here
        });
```

# requestAnimationFrame polyfill

Based on code from https://gist.github.com/paulirish/1579671

1. Open bower.json
2. Add `"easy-animate": "~1.2.0"` to your dependency list
3. Run `bower install`
4. In your application you can now add:
   * `<script src="components/easy-animate/requestAnimationFrame.js"></script>`
   * `<script src="components/easy-animate/angular-animate.js"></script>`


## AngularJS Usage

The utility wraps a single call request animation frame in a promise that is resolved by the animation triggering.
Add `coAnimate` to your apps module dependancy list then use it as a service

```javascript
    $nextFrame().then(function() {
        // animate here
    });
```

or in the middle of a promise chain

```javascript
    $http.get(asset)
        .then($nextFrame())
        .then(function() {
            // animate here
        });
```

and when you want to animate based on data that may be updating multiple times per frame

```javascript
    var runAnimation = $animation(function apply(position) {
            this.position = position;
            this.text = currentText();    // For example
        }, function compute() {
            buildScene(this.position, this.text);
        });

    $document.bind('scroll', function(e) {
        // Will call apply every time scroll is triggered
        // Will only call compute on animation frames
        runAnimation(e.pos_x);  // also for example
    });
```

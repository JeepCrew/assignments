# Homework 2.1 - Ever wonder what all these signs say?

For Homework 1.1, you found a nice project on Github, forked it into your own account, and cloned it into your Cloud 9 IDE account. For this assignment, pick one or more Javascript files from your project (you DID pick a Javascript project, didn't you?) and identify some of the following items of Javascript grammar and vocabulary that we talked about in class, including but not limited to:

* Variables: `$name`
* Constants: `E_USER_WARNING`, `MY_AWESOME_CONSTANT`
* Arithmetic operators: addition (+), subtraction (-)
* Functions: `array_slice()`, `do_something_amazing()`

When you find one, identify the file and line number in this file, below the instrcutions per the example below. Try to make the indentation match the original file (yes, copy and paste), even if that means there's NO indentation. Crazy Javascript-ers.

You don't have to identify EVERYTHING in a given line or even in a single file, but you may get extra points if you're thorough or make a survey of more than one file... And you might get docked if you make too much work for me. I at least want to see about 50 lines of code.

When you're done editing this file, save it, commit it, and push it to your "assignments" repo, called "origin". You remember how to push, right?

## Your work should look like this...

`path/to/file.js:3`
```javascript
    if ( true )
    // Boolean: true
```

`path/to/file.js:42`
```javascript
    var name = do_something_amazing() + 1;
    // Variable: name
    // Function: do_something_amazing()
    // Integer: 1
```

## Now get to it!

`https://c9.io/jeepcrew/scrollreveal_js:28`
```javascript
    var docElem = window.document.documentElement;
    // Variable: docElem
    // Variable: window.document.documentElement
```
    
`https://c9.io/jeepcrew/scrollreveal_js:56`
```javascript
    function isElementInViewport (el, h) {
    var scrolled = window.pageYOffset,
        viewed = scrolled + getViewportH(),
        elH = el.offsetHeight,
        elTop = getOffset(el).top,
        elBottom = elTop + elH,
        h = h || 0;
    //  Function: isElementInViewport( el, h ), getViewportH(), getOffset( el)
    //  Variables: scrolled, viewed, elH, elTop, elBottom, h, window.pageYOffset, el.offsetHeight
    //  Arithmetic Operators:   +
    //  Logical Operators:  ||
```

`https://c9.io/jeepcrew/scrollreveal_js:84-89`
```javascript
    scrollReveal.prototype = {
    defaults: {
      axis: 'y',
      distance: '25px',
      duration: '0.66s',
      delay: '0s',
    //  Variable: scrollReveal.prototype
```

`https://c9.io/jeepcrew/scrollreveal_js:111-118`
```javascript
    var scrollHandler = function () {
        if (!self.scrolled) {
          self.scrolled = true;
          setTimeout(function () {
            self._scrollPage();
          }, 60);
        }
      };
    //  Variables:  scrollHandler, 
    //  Boolean:  true
    //  Functions:  function (), self._scrollPage ()
    //  Constant: 60
    //  Arithmetic Operators:   =
    //  Logical Statement: if
```

`https://c9.io/jeepcrew/scrollreveal_js:137-145`
```javascript
    _scrollPage: function () {
        var self = this;

        this.elems.forEach(function (el, i) {
            if (isElementInViewport(el, self.options.viewportFactor)) {
                self.animate(el);
            }
        });
        this.scrolled = false;
    },
    //  Variables: self, this, this.scrolled
    //  Boolean: false
    //  Functions: function (), this.elems.forEach (), isElementInViewport {}, self.animate ()
    //  Logical Statement: if
    //  ?Constant:  _scrollpage?
```

`https://c9.io/jeepcrew/scrollreveal_js:168-176`
```javascript
    words.forEach(function (word, i) {
          if (blacklist.indexOf(word) > -1) {
            return;
          }
          ret.push(word);
        });

        return ret;
      }
    //  Function: words.forEach ()function (), ret.push (), blacklist.indexOf ()
    //  Logical Statement:    if, ?return?
    //  Arithmetic Operators:   >
    //  Constant:   -1
```
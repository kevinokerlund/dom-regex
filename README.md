# reqex-query
JavaScript library for querying DOM elements with Regular Expressions

This library is UMD wrapped so it can be used with or without a module loader such as requireJS.

##Installing
```javascript
npm install regex-query
```

## Including

#### Babel
```javascript
import RegexQuery from “regex-query”;
```

#### Browserify/Webpack
```javascript
var RegexQuery = require("regex-query");
```

## Usage

RegexQuery has two different methods that are available for use, `one`, and `all`, and behave like `querySelector`, and `querySelectorAll`. `one` returns the first instance it finds, and `all` returns all instances it finds in an array.

---

#### `.all(regex [,attributeName])`
**Description:** Returns an `Array` of all the matched elements

#### `.one(regex [,attributeName])`
**Description:** Returns only the first matched element

**`regex`**  
_`type`_: Regular Expression  
A pattern to match against. By default, the Regular Expression is applied to the entire opening tag of HTML elements. If an `attributeName` is provided as a second argument, the regular expression will be applied to only the value of the attribute, if it exists.

**`attributeName`**  
_`type`_: String  
An attribute name to which the regex would be scoped.

---

## Examples

To get all elements with any `data-*` attribute:

```javascript
var elements = RegexQuery.all(/data-[a-z]/);
```

To get all elements that have a data-id attribute that conforms to a pattern, (for example 3 numbers followed 3 letters):
```javascript
var elements = RegexQuery.all(/^\d{3}[a-z]{3}$/i, 'data-id');
```

## Keep in mind:
* When you are querying without an `attributeName`, your regex is being applied to the entire **inside** contents of the opening tag of HTML elements. For example, if you wanted to get all elements that have a `tagName` that starts with `x`, you would do the following:

```javascript
// This is correct:
var xEls = RegexQuery.all(/^x/);

// This is incorrect:
var xEls = RegexQuery.all(/^<x/); // note the `<`
```

* Performance will always be slower when there is no `attributeName` passed in. This is just from preliminary testing, but on a page with ~2000 nodes, it takes ~18ms to complete the query when using `.all()`. When using an `attributeName`, it only adds on ~.5ms to a regular `querySelectorAll` call, with a `filter` attached to it to get the same result you would from this library.

* Don't forget that in many cases, you can get the element using more advanced queries to `querySelector`, and `querySelectorAll`. For example, you can obtain elements with a data-id attribute that contain a 3:  

```javascript
var elements = document.querySelectorAll('[data-id*="3"]');
```

## Contributing
Any pull-requests/suggestions/etc., are definitely welcome.

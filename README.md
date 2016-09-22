# dom-regex
JavaScript library for querying DOM elements with Regular Expressions

This library is UMD wrapped so it can be used with or without a module loader such as requireJS.

##Install
```javascript
npm install --save dom-regex
```

## Usage
```javascript
import DomRegex from 'dom-regex';

// Query for all custom components
// custom components are required to have hyphen in them
let matches = DomRegex.all(/^[a-z]+-[a-z]+/);
```

## API

#### Argument Definitions:

 **`regex`**  
 _`type`_: Regular Expression  
 A pattern to match against. By default, the Regular Expression is applied to the entire opening tag of HTML elements.
 If an `attributeName` is provided as an argument, the regular expression will be applied to only the value of the
 attribute, if it exists.
 
 **`attributeName`**  
 _`type`_: String  
 An attribute name to which the regex would be scoped instead.
 
 **`query`**  
 _`type`_: *  
 Can be one of four things:
 * **DOM Element**
   - An element from the page. For example, `let domElement = document.getElementById('foo');`
 * **Query Selector**
   - A regular query selector that would be passed to `querySelector`. For example: `div.foo`
 * **NodeList**
   - An entire selection of elements. `document.querySelectorAll('option');`.
 * **Array of DOM Elements**
   - Many people convert NodeList's to arrays immediately after obtaining them so Array methods (`.forEach`) can be used.
   
### `.all`
The `all` methods return **all** of the DOM elements in an array that match the regex. If no elements match, it returns
an empty array.

#### `DomRegex.all(regex, [,attributeName])`
**Description** Queries the entire page. Returns an Array of matching elements.

Examples:
```javascript
// Query all custom elements
let customElements = DomRegex.all(/^[a-z]+-[a-z]+/);

// Query all elements that have a data-id attribute that contains only numbers
let numericalIds = DomRegex.all(/\d+/, 'data-id');
```

---

#### `DomRegex.all.inside(query, regex, [,attributeName])`
**Description** Queries for elements nested inside of the query argument. Returns an Array of matching elements.

Examples: 
```javascript
// Query for all custom elements in a particual element
let element = document.getElementById('#element');
let customElement = DomRegex.all.inside(element, /^[a-z]+-[a-z]+/);

// Query for all custom elements nested inside a div with a specific classname
let customElements = DomRegex.all.inside('div.special', /^[a-z]+-[a-z]+/);

// Query by using a nodeList
let elements = DomRegex.all.inside(document.querySelectorAll('div'), /\d+/, 'data-id');

// Query by using an Array of nodes
let elementsArray = [].slice.call(document.querySelectorAll('div'));
let elements = DomRegex.all.inside(elementsArray, /\d+/, 'data-id');
```

---

#### `DomRegex.all.against(query, regex, [,attributeName])`
**Description** Unlike the `all.inside()` method, this method applies the regex against the elements that are passed in,
instead of searching children elements.

Examples: 
```javascript
// See if a current element is a custom element tag (will return back empty array if not)
let element = document.getElementById('.element');
let customElement = DomRegex.all.against(element, /^[a-z]+-[a-z]+/);

// Find any div's with a class of special that have some sort of data- attribute
let customElements = DomRegex.all.against('div.special', /data-/);

// Find the find any divs with a data-id attribute that contains only numbers
let elements = DomRegex.all.against(document.querySelectorAll('div'), /\d+/, 'data-id');

// Query against an Array of nodes
let elementsArray = [].slice.call(document.querySelectorAll('div'));
let elements = DomRegex.all.against(elementsArray, /\d+/, 'data-id');
```

---

### `.one`
The `one` methods return **only the first** DOM element that matches the regex. If no elements matches, it returns `null`.

#### `DomRegex.one(regex, [,attributeName])`
**Description** Queries the entire page. Returns the first element that matches the regex. See the examples above for
more clarification on how this method works.

---

#### `DomRegex.one.inside(query, regex, [,attributeName])`
**Description** Queries for the first element nested inside of a query argument. See the examples above for more
clarification on how this method works.

---

#### `DomRegex.one.against(query, regex, [,attributeName])`
**Description** Unlike the `one.inside()` method, this method applies the regex against the elements that are passed in,
instead of searching children elements. Returns the first element that matches. See the examples above for more
clarification on how this method works.

---

## Other Examples

To get all elements with any `data-*` attribute:

```javascript
let elements = DomRegex.all(/data-[a-z]/);
```

To get all elements that have a data-id attribute that conforms to a pattern, (for example 3 numbers followed 3 letters):
```javascript
let elements = DomRegex.all(/^\d{3}[a-z]{3}$/i, 'data-id');
```

## Keep in mind:
* When you are querying without an `attributeName`, your regex is being applied to the entire **inside** contents of the
opening tag of HTML elements. For example, if you wanted to get all elements that have a `tagName` that starts with `x`,
you would do the following:

```javascript
// This is correct:
let xEls = DomRegex.all(/^x/);

// This is incorrect:
let xEls = DomRegex.all(/^<x/); // note the `<`
```

* Don't forget that in many cases, you can get the element using more advanced queries to `querySelector`, and
`querySelectorAll`. For example, you can obtain elements with a data-id attribute that contain a 3:  

```javascript
let elements = document.querySelectorAll('[data-id*="3"]');
```

## Contributing
Any pull-requests/suggestions/etc., are definitely welcome.

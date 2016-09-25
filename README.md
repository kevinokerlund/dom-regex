# dom-regex
A JavaScript library for querying DOM elements with Regular Expressions.

This library is UMD wrapped so it can be used with or without a module loader such as requireJS.

## Install

```shell
npm install --save event-bundle
```

_**Note:**_ If this library is exposed directly to the window, it operates under the global variable `DomRegex`. Keep
in mind you may be in an environment (ex: webpack) that requires you explicitly expose it to the window if you intend
to use if from a window perspective.



## Example Usage
```javascript
let DomRegex = require('dom-regex');

// find all elements with any data- attribute
let elements = DomRegex.all(/data-[a-z]/);
```


---


The following examples and methods behave like `querySelectorAll` and `querySelector`. The methods that use `all`
return all matching instances. The methods that use `one` return only the first instance found.



## Querying through all the elements on the window

**Methods:**  
`DomRegex.all(regex [, attributeName])`  
`DomRegex.one(regex [, attributeName])`

When not using an attribute name, the regex is applied to the entire inside contents of the element's opening tag. If
the tag is `<div class="bar" data-id="141pop">` then the regex would be applied to `div class="bar" data-id="141pop"`

#### Finding all matches on the window:
```javascript
let elements = DomRegex.all(/data-[a-z]/);
```

#### Finding the first match on the window:
```javascript
let element = DomRegex.one(/data-[a-z]/);
```

### Find all elements that have an attribute value that matches a Regular Expression
When using an attribute name, the regex is applied to the value of the attribute. If the element's opening tag was
`<div class="bar" data-id="141pop">` and the attribute name supplied was `data-id`, then the regex would be tested
against `141pop`.

#### Finding all matches against an attribute name:
```javascript
// find all elements that have a data-id attribute that starts with 3 digits
let elements = DomRegex.all(/^\d{3}/, 'data-id');
```

#### Finding one match against an attribute name:
```javascript
let element = DomRegex.one(/^\d{3}/, 'data-id');
```



## Querying children of elements
Querying "inside" of elements is much like using `querySelectorAll` on an `HTMLElement`
(`element.querySelectorAll('...')`). This method takes it a step further by offering the ability to query inside lists
of elements, or by using selectors.

**Methods:**  
`DomRegex.all.inside(query, regex [, attributeName])`  
`DomRegex.one.inside(query, regex [, attributeName])`

#### Querying inside of a specific element:
```javascript
// find all custom elements inside of #element
let element = document.getElementById('#element');
let customElement = DomRegex.all.inside(element, /^[a-z]+-[a-z]+/);
```

#### Querying inside elements using a selector:
```javascript
// find all custom elements inside of any div with a class of "bar"
let customElement = DomRegex.all.inside('div.bar', /^[a-z]+-[a-z]+/);
```

#### Querying inside each element in a NodeList
```javascript
let divs = document.querySelectorAll('div');
let elements = DomRegex.all.inside(divs, /\d+/, 'data-id');
```

#### Querying inside each element in an Array
```javascript
let elements = DomRegex.all.inside(arrayOfElements, /\d+/, 'data-id');
```



## Querying against elements
When querying against elements, you apply the regex directly to the element. This allows you to filter elements that
you have already obtained.

**Methods:**  
`DomRegex.all.against(query, regex, [, attributeName])`  
`DomRegex.one.against(query, regex, [, attributeName])`

#### Applying regex to a specific element
```javascript
let element = document.getElementById('#element');
let customElement = DomRegex.all.against(element, /^[a-z]+-[a-z]+/);
// if this passes, it would return the element in an array because we are using `all`
```

#### Applying regex to elements that match a selector
```javascript
// this will test all divs with a class of "bar"
let customElement = DomRegex.all.against('div.bar', /\d{3}/, 'data-id');
```

#### Applying regex to elements inside of a NodeList
```javascript
let divs = document.querySelectorAll('div');
let elements = DomRegex.all.against(divs, /\d+/, 'data-id');
```

#### Applying regex to elements inside of an array
```javascript
let elements = DomRegex.all.against(arrayOfElements, /\d+/, 'data-id');
```



## Other Examples:
Get all elements with a `data-` attribute
```javascript
let elements = DomRegex.all(/data-[a-z]/);
```

Get all elements that have a data-id attribute that conforms to a pattern, (for example 3 numbers followed 3 letters):
```javascript
let elements = DomRegex.all(/^\d{3}[a-z]{3}$/i, 'data-id');
```

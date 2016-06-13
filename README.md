# Open Permissions Platform Offer Viewer
This library is responsible for displaying an ODRL offer in human-readable form.

Install
------

Include it in your package.json file, and run `npm install`.

Standalone Build
----------------

A standalone script is in the "dist" directory, which creates a `OfferViewer`
global when the script is included in a web page. To build the standalone
version run `npm run build` or `npm run build:min` for the minified version.

Usage
-----
The Offer viewer uses elements of Bootstrap css and its default theme. Visit the [Bootstrap](http://getbootstrap.com/getting-started/) website for instructions on how to use.

```javascript
var OfferViewer = require('offer-viewer');
var offer = <json-ld offer>
new OfferViewer(offer);
```

```html
<html>
    <body>
        <offer-renderer></offer-renderer>
    </body>
</html>
```
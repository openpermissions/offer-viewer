# Offer Viewer
A javascript component that will display an ODRL offer in human-readable form.

+ [Acronyms](#acronyms)
+ [Using the Offer Viewer](#using-the-offer-viewer)
+ [Developing the Offer Viewer](#developing-the-offer-viewer)

## Acronyms

| Acronym | Description                   |
| :------ | :----------                   |
| ODRL    | Open Digital Rights Language  |

## Using the Offer Viewer

### Install
Start by installing the offer-viewer via npm:
```
npm install offer-viewer --save
```

### Render
The Offer viewer uses bootstrap components and class names. For details on how to customise the css of the Offer Viewer please refer
to the [Bootstrap](http://getbootstrap.com) documentation.

### Render Offer Viewer within page using default element tag
**index.js**
```javascript
var OfferViewer = require('offer-viewer');
var offer = <json-ld offer>
new OfferViewer(offer);
```
**index.html**
```html
<html>
    <body>
        <offer></offer>
    </body>
</html>
```

### Render Offer Viewer within page using custom element tag
**index.js**
```javascript
var OfferViewer = require('offer-viewer');
var offer = <json-ld offer>
new OfferViewer(offer, tag='my-tag');
```

**index.html**
```html
<html>
    <body>
        <my-tag></my-tag>
    </body>
</html>
```

See [index.html](https://github.com/openpermissions/offer-viewer/blob/master/index.html) for sample usage.


## Developing the Offer Viewer

The UI is implemented completely in JavaScript using [Riot.js](http://riotjs.com/) as an html templating framework

###  Getting Started

Download & install [node & npm](http://nodejs.org/download/) or use your
package manager of choice e.g.

```bash
brew install node
```

###  Install dependencies

```bash
npm install
```

### Standalone Build

A standalone version of the Offer Viewer can be generated. The standalone script will be built in the "dist" directory, and creates a `OfferViewer`
global when the script is included in a web page. To build the standalone script run

```bash
npm run build-standalone
```

or if you require automatic rebuild of the bundle whenever there are file changes, run

```bash
npm run build-standalone:watch
```
or if you require a minified version of the standalone build, run

```bash
npm run build-standalone:min
```


### Running the example

You need a web server to serve index.html. We recommend you use python's HTTP Server e.g: 

```
python -m SimpleHTTPServer
```

You should be able to view the application at
[http://localhost:8000](http://localhost:8000).


### Deployment

#### Publish to npm
The offer-viewer has been published to npm under the OpenPermissions account. To publish a new version, increase the version number
in package.json and run

```
npm publish ./
```

####  Deploy Web UI

The UI is deployed to a S3 bucket, so you need the `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY` to be in the environment or defined in the
[deploy/config.json](./deploy/config.json) file using the `accessKeyId` and
`secretAccessKey` object keys (see [the
docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Environment_Variables)).

To deploy run:

```bash
npm run deploy <S3_BUCKET>
```

#### Deploy Web UI to production

Run the following commands to deploy to offer.digicat.io

```bash
npm install
npm run deploy offer.digicat.io
```
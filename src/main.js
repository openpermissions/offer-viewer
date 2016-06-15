'use strict';

const defaults = require('lodash.defaults');
const riot = require('riot');
const rdf = require('rdflib');
require('./templates/offer-renderer.tag');
require('./templates/permission-renderer.tag');
require('./templates/duty-renderer.tag');
require('./templates/constraint-renderer.tag');
require('./templates/prohibition-renderer.tag');
const OfferParser = require('./offer-parser');
const OntologyParser = require('./ontology-parser');
const jsonld = require('jsonld');
const odrl = require('./ontology/odrl.json');
const op = require('./ontology/openpermissions.json');
const opex = require('./ontology/opex.json');
const geo = require('./ontology/geonames_countries.json');

class OfferRenderer {
  constructor(offerData, tag='offer') {
    this.version = '__VERSION__';

    const ontology = new OntologyParser();
    let odrl_promise = ontology.loadOntology(odrl);
    let op_promise = ontology.loadOntology(op);
    let opex_promise = ontology.loadOntology(opex);
    let geo_promise = ontology.loadOntology(geo);

    const offer = new OfferParser();
    let offer_promise = offer.loadOffer(offerData);

    Promise.all([offer_promise, odrl_promise, op_promise, opex_promise, geo_promise]).then(() => {

      let nodes = document.getElementsByTagName(tag);
      if (nodes.length == 0) {
        throw Error(`Tag ${tag} not found in html`)
      }
      nodes[0].innerHTML = '<offer-renderer></offer-renderer>';

      riot.mount('offer-renderer', {ontology: ontology, policy: offer});
    });
  }
}

module.exports = OfferRenderer;

/**
 * Offer viewer
 *
 * Copyright 2016 Open Permissions Platform Coalition
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const riot = require('riot');
require('./templates/offer-renderer.tag');
require('./templates/permission-renderer.tag');
require('./templates/duty-renderer.tag');
require('./templates/constraint-renderer.tag');
require('./templates/prohibition-renderer.tag');
const OfferParser = require('./offer-parser');
const OntologyParser = require('./ontology-parser');

class OfferRenderer {
  constructor(offerData, tag='offer') {
    this.version = '__VERSION__';

    const ontology = new OntologyParser();
    const offer = new OfferParser();

    Promise.all([ontology.loadAll(), offer.loadOffer(offerData)]).then(() => {
      const nodes = document.getElementsByTagName(tag);
      if (nodes.length == 0) {
        throw Error(`Tag ${tag} not found in html`);
      }
      nodes[0].innerHTML = '<offer-renderer></offer-renderer>';

      riot.mount('offer-renderer', {ontology: ontology, policy: offer});
    });
  }
}

module.exports = OfferRenderer;

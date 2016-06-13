/**
 * Template Generator
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

const _get = require('lodash.get'),
      jsonld = require('jsonld');

function op(value) { return 'http://openpermissions.org/ns/op/1.1/' + value; }
function odrl(value) { return 'http://www.w3.org/ns/odrl/2/' + value; }
function opex(value) { return 'http://openpermissions.org/ns/opex/1.0/' + value; }
function rdfs(value) { return 'http://www.w3.org/2000/01/rdf-schema#' + value; }
function rdf(value) { return 'http://www.w3.org/1999/02/22-rdf-syntax-ns#' + value; }
function skos(value) { return 'http://www.w3c.org/2008/skos/' + value; }
function owl(value) { return 'http://www.w3.org/2002/07/owl#' + value; }


class OPEntity {
  constructor(data) {
    this.id = data['@id'];
    this.name = _get(data, [rdfs('label'), 0, '@value']);
    this.description = _get(data, [rdfs('comment'), 0, '@value']);
  }
}

class GeoLocation {
  constructor(data) {
    this.id = data['@id'];
    this.name = _get(data, ['http://www.geonames.org/ontology#name', 0, '@value']);
    this.description = '';
  }
}

class Ontology {
  constructor() {
    this.entity = {};
  }

  loadOntology(ontology) {
    let self = this;
    return new Promise(function (resolve, reject) {
      jsonld.expand(ontology, (error, expanded) => {
        if (error) {
          reject(error);
          return;
        }
        expanded.forEach(i => {
          if (i['@type'].indexOf('http://www.geonames.org/ontology#Feature') != -1) {
            self.entity[i['@id']] = new GeoLocation(i);
          } else {
            self.entity[i['@id']] = new OPEntity(i);
          }
        });
        resolve(self);
      });
    });
  }
}
module.exports = Ontology;

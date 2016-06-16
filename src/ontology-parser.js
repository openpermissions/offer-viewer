/**
 * Ontology Parser
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
      jsonld = require('jsonld'),
      rdfs = require('./helper').rdfs,
      geo = require('./helper').geo;

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
    this.name = _get(data, [geo('name'), 0, '@value']);
    this.description = '';
  }
}

class Ontology {
  constructor() {
    this.entity = {};
  }

  loadODRL() {
    /**
     * Loads ODRL Ontology into Ontology Parser
     * @returns Promise
     */
    const val = require('./ontology/odrl.json');
    return this._load(val);
  }

  loadOP(){
    /**
     * Loads Open Permissions Ontology into Ontology Parser
     * @returns Promise
     */
    const val = require('./ontology/openpermissions.json');
    return this._load(val);
  }

  loadOPEX(){
    /**
     * Loads Open Permissions Extension Ontology into Ontology Parser
     * @returns Promise
     */
    const val = require('./ontology/opex.json');
    return this._load(val);
  }

  loadGeo() {
    /**
     * Loads Geonames Ontology into Ontology Parser
     * @returns Promise
     */
    const val = require('./ontology/geonames_countries.json');
    return this._load(val);
  }

  loadAll() {
    /**
     * Loads all known ontologies into Ontology Parser
     * @returns Promise
     */
    return Promise.all([this.loadODRL(), this.loadOP(), this.loadOPEX(), this.loadGeo()]);
  }

  _load(ontology) {
    /** Loads given ontology into Ontology Parser
     * @param JSONLD Ontology
     * @returns Promise
     */
    const self = this;
    return new Promise(function (resolve, reject) {
      jsonld.expand(ontology, (error, expanded) => {
        if (error) {
          reject(error);
          return;
        }
        expanded.forEach(i => {
          if (i['@type'].indexOf(geo('Feature')) != -1) {
            self.entity[i['@id']] = new GeoLocation(i);
          } else {
            self.entity[i['@id']] = new OPEntity(i);
          }
        });
        resolve(true);
      });
    });
  }
}
module.exports = Ontology;

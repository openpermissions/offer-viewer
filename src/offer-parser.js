/**
 * Offer Parser
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

const jsonld = require('jsonld');
const odrl = require('./helper').odrl;

class OfferParser {
  constructor() {
    this.offer = null;
    this.permission={};
    this.prohibition={};
    this.constraint={};
    this.duty={};
  }

  /**
   * Load existing offer into Offer Parser
   * @param offerData - JSONLD offer
   */
  loadOffer(offerData) {
    this.offer = null;
    this.permission={};
    this.prohibition={};
    this.constraint={};
    this.duty={};

    const self = this;
    return new Promise(function (resolve, reject) {
      jsonld.expand(offerData, (error, offer) => {
        if (error) {
          reject(error);
          return;
        }
        offer.forEach(i => {
          const type = i['@type'];
          if (type.indexOf(odrl('Offer')) != -1) {
            self.offer = i;
          } else if (type.indexOf(odrl('Permission')) != -1) {
            self.permission[i['@id']] = i;
          } else if (type.indexOf(odrl('Prohibition')) != -1) {
            self.prohibition[i['@id']] = i;
          } else if (type.indexOf(odrl('Constraint')) != -1) {
            self.constraint[i['@id']] = i;
          } else if (type.indexOf(odrl('Duty')) != -1) {
            self.duty[i['@id']] = i;
          }
        });

        if (!self.offer) {
          reject('Cannot load data');
          return;
        }
        resolve(true);
      });
    });
  }
}

module.exports = OfferParser;

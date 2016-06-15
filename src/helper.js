/**
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

const getSymbolFromCurrency = require('currency-symbol-map').getSymbolFromCurrency;


function actionName(entity, ontology) {
  const id = entity['http://www.w3.org/ns/odrl/2/action'][0]['@id'];
  return ontology.entity[id].name;
}

function actionDescription(entity, ontology){
  const id = entity['http://www.w3.org/ns/odrl/2/action'][0]['@id'];
  return ontology.entity[id].description;
}

function operatorName(entity, ontology){
  const value = entity['http://www.w3.org/ns/odrl/2/operator'][0]['@id'];
  return ontology.entity[value].name;
}

function constraintKey(entity){
  let value = null;
  Object.keys(entity).forEach(function(key) {
    if (['@id', '@type', 'http://www.w3.org/ns/odrl/2/unit', 'http://www.w3.org/ns/odrl/2/operator'].indexOf(key) == -1) {
      value = key;
    }
  });
  return value;
}

function constraintName(entity, ontology){
  const key = constraintKey(entity) ;
  let name = ontology.entity[key].name;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
}

function constraintDescription(entity, ontology){
  const key = constraintKey(entity) ;
  return ontology.entity[key].description;
}

function constraintValue(entity, ontology){
  const key = constraintKey(entity);
  let value = '';
  const valueObj = entity[key][0];
  if (valueObj['@value']) {
    value = entity[key][0]['@value'];
  } else {
    const id = valueObj['@id'];
    value = ontology.entity[id].name;
  }

  let unit = entity['http://www.w3.org/ns/odrl/2/unit'];
  if (unit) {
    unit = unit[0]['@id'];

    const unitName = ontology.entity[unit];
    if (unitName !== undefined) {
      value = value + ' ' + unitName.name;
    } else {
      //Special case for currency codes
      if (unit.startsWith('http://cvx.iptc.org/iso4217a/')) {
        unit = unit.replace('http://cvx.iptc.org/iso4217a/', '');
        value = getSymbolFromCurrency(unit) + value;
      } else {
        value = value + ' ' + unit;
      }
    }
  }
  return value;
}

module.exports = {
  rdfs: function rdfs(value) { return 'http://www.w3.org/2000/01/rdf-schema#' + value; },
  odrl: function odrl(value) { return 'http://www.w3.org/ns/odrl/2/' + value; },
  geo: function geo(value) { return 'http://www.geonames.org/ontology#' + value; },
  actionName: actionName,
  actionDescription: actionDescription,
  constraintDescription: constraintDescription,
  constraintValue: constraintValue,
  constraintName: constraintName,
  operatorName: operatorName
};

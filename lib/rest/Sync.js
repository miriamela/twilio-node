'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var _ = require('lodash');  /* jshint ignore:line */
var Domain = require('../base/Domain');  /* jshint ignore:line */
var V1 = require('./sync/V1');  /* jshint ignore:line */


/* jshint ignore:start */
/**
 * Initialize sync domain
 *
 * @constructor Twilio.Sync
 *
 * @property {Twilio.Sync.V1} v1 - v1 version
 * @property {Twilio.Sync.V1.ServiceList} services - services resource
 *
 * @param {Twilio} twilio - The twilio client
 */
/* jshint ignore:end */
function Sync(twilio) {
  Domain.prototype.constructor.call(this, twilio, 'https://sync.twilio.com');

  // Versions
  this._v1 = undefined;
}

_.extend(Sync.prototype, Domain.prototype);
Sync.prototype.constructor = Sync;

Object.defineProperty(Sync.prototype,
  'v1', {
  get: function() {
    this._v1 = this._v1 || new V1(this);
    return this._v1;
  }
});

Object.defineProperty(Sync.prototype,
  'services', {
  get: function() {
    return this.v1.services;
  }
});

module.exports = Sync;
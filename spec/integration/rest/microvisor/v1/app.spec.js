'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Holodeck = require('../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('App', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should treat the first each arg as a callback',
    function(done) {
      var body = {
          'apps': [
              {
                  'sid': 'KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'hash': 'hash',
                  'unique_name': 'unique name',
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'url': 'https://microvisor.twilio.com/v1/Apps/KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'apps'
          }
      };
      holodeck.mock(new Response(200, body));
      client.microvisor.v1.apps.each(() => done());
    }
  );
  it('should treat the second arg as a callback',
    function(done) {
      var body = {
          'apps': [
              {
                  'sid': 'KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'hash': 'hash',
                  'unique_name': 'unique name',
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'url': 'https://microvisor.twilio.com/v1/Apps/KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'apps'
          }
      };
      holodeck.mock(new Response(200, body));
      client.microvisor.v1.apps.each({pageSize: 20}, () => done());
      holodeck.assertHasRequest(new Request({
          method: 'GET',
          url: 'https://microvisor.twilio.com/v1/Apps',
          params: {PageSize: 20},
      }));
    }
  );
  it('should find the callback in the opts object',
    function(done) {
      var body = {
          'apps': [
              {
                  'sid': 'KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'hash': 'hash',
                  'unique_name': 'unique name',
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'url': 'https://microvisor.twilio.com/v1/Apps/KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'apps'
          }
      };
      holodeck.mock(new Response(200, body));
      client.microvisor.v1.apps.each({callback: () => done()}, () => fail('wrong callback!'));
    }
  );
  it('should generate valid list request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.microvisor.v1.apps.list();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var url = 'https://microvisor.twilio.com/v1/Apps';

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function(done) {
      var body = {
          'apps': [],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'apps'
          }
      };

      holodeck.mock(new Response(200, body));

      var promise = client.microvisor.v1.apps.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid read_full response',
    function(done) {
      var body = {
          'apps': [
              {
                  'sid': 'KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'hash': 'hash',
                  'unique_name': 'unique name',
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'url': 'https://microvisor.twilio.com/v1/Apps/KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://microvisor.twilio.com/v1/Apps?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'apps'
          }
      };

      holodeck.mock(new Response(200, body));

      var promise = client.microvisor.v1.apps.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid fetch request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.microvisor.v1.apps('KAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'KAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://microvisor.twilio.com/v1/Apps/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function(done) {
      var body = {
          'sid': 'KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'hash': 'hash',
          'unique_name': 'look at this crazy app',
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z',
          'url': 'https://microvisor.twilio.com/v1/Apps/KAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };

      holodeck.mock(new Response(200, body));

      var promise = client.microvisor.v1.apps('KAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid remove request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.microvisor.v1.apps('KAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').remove();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'KAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://microvisor.twilio.com/v1/Apps/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function(done) {
      var body = null;

      holodeck.mock(new Response(204, body));

      var promise = client.microvisor.v1.apps('KAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').remove();
      promise.then(function(response) {
        expect(response).toBe(true);
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});
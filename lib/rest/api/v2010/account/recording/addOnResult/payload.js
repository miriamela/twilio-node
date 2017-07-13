'use strict';

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var Page = require('../../../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../../../base/values');  /* jshint ignore:line */

var PayloadList;
var PayloadPage;
var PayloadInstance;
var PayloadContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList
 * @description Initialize the PayloadList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid - The unique sid that identifies this account
 * @param {string} referenceSid - A string that uniquely identifies the recording.
 * @param {string} addOnResultSid - A string that uniquely identifies the result
 */
/* jshint ignore:end */
PayloadList = function PayloadList(version, accountSid, referenceSid,
                                    addOnResultSid) {
  /* jshint ignore:start */
  /**
   * @function payloads
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext}
   */
  /* jshint ignore:end */
  function PayloadListInstance(sid) {
    return PayloadListInstance.get(sid);
  }

  PayloadListInstance._version = version;
  // Path Solution
  PayloadListInstance._solution = {
    accountSid: accountSid,
    referenceSid: referenceSid,
    addOnResultSid: addOnResultSid
  };
  PayloadListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/Recordings/<%= referenceSid %>/AddOnResults/<%= addOnResultSid %>/Payloads.json' // jshint ignore:line
  )(PayloadListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams PayloadInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function each
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   * callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  PayloadListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      opts = { callback: opts };
    } else if (_.isFunction(callback) && !_.isFunction(opts.callback)) {
      opts.callback = callback;
    }

    if (_.isUndefined(opts.callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          opts.callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * @description Lists PayloadInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function list
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  PayloadListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of PayloadInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function page
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  PayloadListInstance.page = function page(opts, callback) {
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({
      uri: this._uri,
      method: 'GET',
      params: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new PayloadPage(
        this._version,
        payload,
        this._solution
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single target page of PayloadInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function getPage
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList
   * @instance
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  PayloadListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({
      method: 'GET',
      uri: targetUrl
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new PayloadPage(
        this._version,
        payload,
        this._solution
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a payload
   *
   * @function get
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList
   * @instance
   *
   * @param {string} sid - Fetch by unique payload Sid
   *
   * @returns {Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext}
   */
  /* jshint ignore:end */
  PayloadListInstance.get = function get(sid) {
    return new PayloadContext(
      this._version,
      this._solution.accountSid,
      this._solution.referenceSid,
      this._solution.addOnResultSid,
      sid
    );
  };

  return PayloadListInstance;
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadPage
 * @augments Page
 * @description Initialize the PayloadPage
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {object} solution - Path solution
 *
 * @returns PayloadPage
 */
/* jshint ignore:end */
PayloadPage = function PayloadPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(PayloadPage.prototype, Page.prototype);
PayloadPage.prototype.constructor = PayloadPage;

/* jshint ignore:start */
/**
 * Build an instance of PayloadInstance
 *
 * @function getInstance
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns PayloadInstance
 */
/* jshint ignore:end */
PayloadPage.prototype.getInstance = function getInstance(payload) {
  return new PayloadInstance(
    this._version,
    payload,
    this._solution.accountSid,
    this._solution.referenceSid,
    this._solution.addOnResultSid
  );
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadInstance
 * @description Initialize the PayloadContext
 *
 * @property {string} sid - A string that uniquely identifies this payload
 * @property {string} addOnResultSid - A string that uniquely identifies the result
 * @property {string} accountSid - The unique sid that identifies this account
 * @property {string} label - A string that describes the payload.
 * @property {string} addOnSid - A string that uniquely identifies the Add-on.
 * @property {string} addOnConfigurationSid -
 *          A string that uniquely identifies the Add-on configuration.
 * @property {string} contentType - The MIME type of the payload.
 * @property {Date} dateCreated - The date this resource was created
 * @property {Date} dateUpdated - The date this resource was last updated
 * @property {string} referenceSid -
 *          A string that uniquely identifies the recording.
 * @property {string} subresourceUris - The subresource_uris
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} payload - The instance payload
 * @param {sid} accountSid - The account_sid
 * @param {sid} referenceSid - The reference_sid
 * @param {sid} addOnResultSid - The add_on_result_sid
 * @param {sid} sid - Fetch by unique payload Sid
 */
/* jshint ignore:end */
PayloadInstance = function PayloadInstance(version, payload, accountSid,
                                            referenceSid, addOnResultSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.addOnResultSid = payload.add_on_result_sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.label = payload.label; // jshint ignore:line
  this.addOnSid = payload.add_on_sid; // jshint ignore:line
  this.addOnConfigurationSid = payload.add_on_configuration_sid; // jshint ignore:line
  this.contentType = payload.content_type; // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line
  this.referenceSid = payload.reference_sid; // jshint ignore:line
  this.subresourceUris = payload.subresource_uris; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    accountSid: accountSid,
    referenceSid: referenceSid,
    addOnResultSid: addOnResultSid,
    sid: sid || this.sid,
  };
};

Object.defineProperty(PayloadInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new PayloadContext(
        this._version,
        this._solution.accountSid,
        this._solution.referenceSid,
        this._solution.addOnResultSid,
        this._solution.sid
      );
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a PayloadInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed PayloadInstance
 */
/* jshint ignore:end */
PayloadInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a PayloadInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed PayloadInstance
 */
/* jshint ignore:end */
PayloadInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext
 * @description Initialize the PayloadContext
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {sid} accountSid - The account_sid
 * @param {sid} referenceSid - The reference_sid
 * @param {sid} addOnResultSid - The add_on_result_sid
 * @param {sid} sid - Fetch by unique payload Sid
 */
/* jshint ignore:end */
PayloadContext = function PayloadContext(version, accountSid, referenceSid,
                                          addOnResultSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {
    accountSid: accountSid,
    referenceSid: referenceSid,
    addOnResultSid: addOnResultSid,
    sid: sid,
  };
  this._uri = _.template(
    '/Accounts/<%= accountSid %>/Recordings/<%= referenceSid %>/AddOnResults/<%= addOnResultSid %>/Payloads/<%= sid %>.json' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a PayloadInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed PayloadInstance
 */
/* jshint ignore:end */
PayloadContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new PayloadInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.referenceSid,
      this._solution.addOnResultSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * remove a PayloadInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed PayloadInstance
 */
/* jshint ignore:end */
PayloadContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

module.exports = {
  PayloadList: PayloadList,
  PayloadPage: PayloadPage,
  PayloadInstance: PayloadInstance,
  PayloadContext: PayloadContext
};
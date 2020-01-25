'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trello = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
/* develblock:start */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TrelloButton = require('./components/TrelloButton');

var _TrelloButton2 = _interopRequireDefault(_TrelloButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* develblock:end */

var Trello = {};

var TrelloClient = function TrelloClient(props) {

    var authorizeButtonElement = null;

    var apiKey = props.apiKey,
        clientVersion = props.clientVersion,
        apiEndpoint = props.apiEndpoint,
        authEndpoint = props.authEndpoint,
        intentEndpoint = props.intentEndpoint,
        authorizeName = props.authorizeName,
        authorizeType = props.authorizeType,
        authorizePersist = props.authorizePersist,
        authorizeInteractive = props.authorizeInteractive,
        authorizeScopeRead = props.authorizeScopeRead,
        authorizeScopeWrite = props.authorizeScopeWrite,
        authorizeScopeAccount = props.authorizeScopeAccount,
        authorizeExpiration = props.authorizeExpiration,
        authorizeOnSuccess = props.authorizeOnSuccess,
        authorizeOnError = props.authorizeOnError,
        autoAuthorize = props.autoAuthorize,
        authorizeButton = props.authorizeButton,
        buttonStyle = props.buttonStyle,
        buttonColor = props.buttonColor,
        buttonText = props.buttonText,
        buttonCustomStyles = props.buttonCustomStyles;

    //	The expected options are:
    //	version - The API version
    //	apiEndpoint - The URL that API calls should go to (e.g. https://api.trello.com)
    //	authEndpoint - The URL the authentication requests should go to (e.g. https://trello.com)
    //	intentEndpoint - The 

    var opts = {
        key: apiKey,
        "version": clientVersion,
        "apiEndpoint": apiEndpoint,
        "authEndpoint": authEndpoint,
        "intentEndpoint": intentEndpoint
    };

    var isFunction = function isFunction(val) {
        return typeof val === 'function';
    };

    var deferred = {};

    var waitUntil = function waitUntil(name, fx) {
        if (!deferred[name]) {
            deferred[name] = [];
        }
        deferred[name].push(fx);
    };

    var isReady = function isReady(name, value) {
        if (deferred[name]) {
            var fxs = deferred[name];
            delete deferred[name];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = fxs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var fx = _step.value;

                    fx(value);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    };

    var wrapper = function wrapper(window, wrapperOpts) {
        var readStorage = void 0;
        var writeStorage = void 0;

        var _key = wrapperOpts.key,
            _token = wrapperOpts.token;
        var apiEndpoint = wrapperOpts.apiEndpoint,
            authEndpoint = wrapperOpts.authEndpoint,
            intentEndpoint = wrapperOpts.intentEndpoint,
            _version = wrapperOpts.version;


        var baseURL = apiEndpoint + '/' + _version + '/';
        var location = window.location;


        var extend = function extend() {

            //	Variables
            var extended = {};
            var deep = false;
            var i = 0;
            var length = arguments.length;

            //	Check if a deep merge
            if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
                deep = arguments[0];
                i++;
            }

            //	Merge the object into the extended object
            var merge = function merge(obj) {
                for (var prop in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                        // If deep merge and property is an object, merge properties
                        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                            extended[prop] = extend(true, extended[prop], obj[prop]);
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            // Loop through each object and conduct a merge
            for (; i < length; i++) {
                var obj = arguments[i];
                merge(obj);
            }

            return extended;
        };

        var ajax = function ajax(restOptions) {
            return fetch(restOptions.url, restOptions.options).then(function (response) {
                return response.json();
            }).then(function (data) {
                return restOptions.success(data);
            }).catch(function (error) {
                return restOptions.error(error);
            });
        };

        var authorizeURL = function authorizeURL(args) {
            var baseArgs = {
                response_type: 'token',
                key: _key
            };

            var URLparams = new URLSearchParams(Object.entries(extend(baseArgs, args)));

            return authEndpoint + '/' + _version + '/authorize?' + URLparams;
        };

        var parseRestArgs = function parseRestArgs() {
            var _ref = arguments.length <= 0 ? undefined : arguments[0],
                _ref2 = _slicedToArray(_ref, 4),
                path = _ref2[0],
                params = _ref2[1],
                success = _ref2[2],
                error = _ref2[3];

            if (isFunction(params)) {
                error = success;
                success = params;
                params = {};
            }

            // Get rid of any leading /
            path = path.replace(new RegExp('^/*'), '');

            return [path, params, success, error];
        };

        exports.Trello = Trello = {
            version: function version() {
                return _version;
            },
            key: function key() {
                return _key;
            },
            setKey: function setKey(newKey) {
                _key = newKey;
            },
            token: function token() {
                return _token;
            },
            setToken: function setToken(newToken) {
                _token = newToken;
            },


            // Issue a REST call to the API
            //
            // .rest(method, path, params, success, error)
            // .rest(method, path, success, error)
            //
            // method - The HTTP method to use/simulate (e.g. GET, POST, PUT, DELETE)
            // path - The API path to use (e.g. "members/me")
            // params - Optional.  A hash of values to include in the querystring/body
            //   (e.g. { filter: "open", fields: "name,desc" })
            // success - Function to call when the request succeeds
            // error - Function to call when the request fails
            rest: function rest(method) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
                    args[_key2 - 1] = arguments[_key2];
                }

                var _parseRestArgs = parseRestArgs(args),
                    _parseRestArgs2 = _slicedToArray(_parseRestArgs, 4),
                    path = _parseRestArgs2[0],
                    params = _parseRestArgs2[1],
                    success = _parseRestArgs2[2],
                    error = _parseRestArgs2[3];

                var restOpts = {
                    url: '' + baseURL + path + '?',
                    options: {
                        method: method,
                        mode: 'cors',
                        referrerPolicy: 'no-referrer',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    },
                    success: success,
                    error: error
                    // Only include the key if it's been set to something truthy


                    // Only include body if method is not GET
                };if (method != 'GET') {
                    restOpts.options.body = {};
                }

                // Only include the key if it's been set to something truthy
                if (_key) {
                    restOpts.url = restOpts.url + '&key=' + _key;
                }

                // Only include the token if it's been set to something truthy
                if (_token) {
                    restOpts.url = restOpts.url + '&token=' + _token;
                }

                if (params != null) {
                    extend(restOpts.options.body, params);
                }

                return ajax(restOpts);
            },


            // Has Trello been authorized to issue requests on a user's behalf?
            authorized: function authorized() {
                return _token != null;
            },


            // Clear any existing authorization
            deauthorize: function deauthorize() {
                _token = null;
                writeStorage('token', _token);
            },


            // Request a token that will allow us to make API requests on a user's
            // behalf
            //
            // authorizeOpts =
            //   type - "redirect" or "popup"
            //   name - Name to display
            //   persist - Save the token to local storage?
            //   interactive - If false, don't redirect or popup, only use the stored
            //     token, if one exists
            //   scope - The permissions we're requesting
            //   expiration - When we want the requested token to expire ("1hour",
            //     "1day", "30days", "never")

            authorize: function authorize(userOpts) {
                var authorizeOpts = extend(true, {
                    name: authorizeName || '',
                    type: authorizeType || 'popup',
                    persist: authorizePersist || true,
                    interactive: authorizeInteractive || true,
                    scope: {
                        read: authorizeScopeRead || true,
                        write: authorizeScopeWrite || false,
                        account: authorizeScopeAccount || false
                    },
                    expiration: authorizeExpiration || '30days',
                    success: authorizeOnSuccess || function () {
                        throw new Error('authorizeOnSuccess Callback not specified!');
                    },
                    error: authorizeOnError || function () {
                        throw new Error('authorizeOnError Callback not specified!');
                    }
                }, userOpts);

                var regexToken = /[&#]?token=([0-9a-f]{64})/;

                var persistToken = function persistToken() {
                    if (authorizeOpts.persist && _token != null) {
                        writeStorage('token', _token);
                    }
                };

                if (authorizeOpts.persist) {
                    if (_token == null) {
                        _token = readStorage('token');
                    }
                }

                if (_token == null) {
                    var match = regexToken.exec(location.hash);
                    if (match) {
                        _token = match[1];
                    }
                }

                if (this.authorized()) {
                    persistToken();
                    location.hash = location.hash.replace(regexToken, '');
                    if (isFunction(authorizeOpts.success)) {
                        authorizeOpts.success();
                    }
                    return;
                }

                // If we aren't in interactive mode, and we didn't get the token from
                // storage or from the hash, then we error out here
                if (!authorizeOpts.interactive) {
                    if (isFunction(authorizeOpts.error)) {
                        authorizeOpts.error();
                    }
                    return;
                }

                var scope = Object.keys(authorizeOpts.scope || {}).reduce(function (accum, k) {
                    if (authorizeOpts.scope[k]) {
                        accum.push(k);
                    }
                    return accum;
                }, []).join(',');

                switch (authorizeOpts.type) {
                    case 'popup':
                        (function () {
                            waitUntil('authorized', function (isAuthorized) {
                                if (isAuthorized) {
                                    persistToken();
                                    if (isFunction(authorizeOpts.success)) {
                                        authorizeOpts.success();
                                    }
                                    return;
                                }
                                if (isFunction(authorizeOpts.error)) {
                                    authorizeOpts.error();
                                }
                            });

                            var width = 720;
                            var height = 800;
                            var left = window.screenX + (window.innerWidth - width) / 2;
                            var top = window.screenY + (window.innerHeight - height) / 2;

                            var originMatch = new RegExp('^[a-z]+://[^/]*').exec(location);
                            var origin = originMatch && originMatch[0];
                            var authWindow = window.open(authorizeURL({
                                return_url: origin,
                                callback_method: 'postMessage',
                                scope: scope,
                                expiration: authorizeOpts.expiration,
                                name: authorizeOpts.name
                            }), 'trello', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);

                            var receiveMessage = function receiveMessage(event) {
                                if (event.origin !== authEndpoint || event.source !== authWindow) {
                                    return;
                                }

                                if (event.source != null) {
                                    event.source.close();
                                }

                                if (event.data != null && /[0-9a-f]{64}/.test(event.data)) {
                                    _token = event.data;
                                } else {
                                    _token = null;
                                }

                                if (isFunction(window.removeEventListener)) {
                                    window.removeEventListener('message', receiveMessage, false);
                                }
                                isReady('authorized', Trello.authorized());
                            };

                            // Listen for messages from the auth window
                            if (isFunction(window.addEventListener)) {
                                window.addEventListener('message', receiveMessage, false);
                            }
                        })();
                        break;
                    default:
                        // We're leaving the current page now; but the user should be calling
                        // .authorize({ interactive: false }) on page load
                        window.location = authorizeURL({
                            redirect_uri: location.href,
                            callback_method: 'fragment',
                            scope: scope,
                            expiration: authorizeOpts.expiration,
                            name: authorizeOpts.name
                        });
                }
            },


            //	Request that a card be created, using the provided name, description, and url.  This
            //	options =
            //	name - The name to use for the card
            //	desc - The description to use for the card (optional)
            // 	url - A url to attach to the card (optional)
            // 	next = a method to be called once the card has been created.  The method
            // 	should take two arguments, an error and a card.If next is not defined 
            // 	then a promise that resolves to the card will be returned.
            addCard: function addCard(options, next) {
                var baseArgs = {
                    mode: 'popup',
                    source: _key || window.location.host
                };

                var getCard = function getCard(callback) {
                    var returnUrl = function returnUrl(e) {
                        window.removeEventListener('message', returnUrl);
                        try {
                            var data = JSON.parse(e.data);
                            if (data.success) {
                                callback(null, data.card);
                                return;
                            }
                            callback(new Error(data.error));
                        } catch (error) {} // eslint-disable-line no-empty
                    };

                    if (isFunction(window.addEventListener)) {
                        window.addEventListener('message', returnUrl, false);
                    }

                    var width = 200;
                    var height = 600;
                    var left = window.screenX + (window.outerWidth - width) / 2;
                    var top = window.screenY + (window.outerHeight - height) / 2;

                    var URLparams = new URLSearchParams(Object.entries(extend(baseArgs, options)));
                    return window.open(intentEndpoint + '/add-card?' + URLparams, 'trello', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
                };

                if (next != null) {
                    getCard(next);
                    return undefined;
                }
                if (window.Promise) {
                    return new Promise(function (resolve, reject) {
                        return getCard(function (err, card) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(card);
                            }
                        });
                    });
                }
                getCard(function () {});
                return undefined;
            }
        };

        // Hook up some convenience methods for HTTP methods
        // Trello.get(path, params, success, error)
        // Trello.put(path, params, success, error)
        // Trello.post(path, params, success, error)
        // Trello.delete(path, params, success, error)

        var _loop = function _loop(type) {
            Trello[type.toLowerCase()] = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                return this.rest.apply(this, [type].concat(args));
            };
        };

        var _arr = ['GET', 'PUT', 'POST', 'DELETE'];
        for (var _i = 0; _i < _arr.length; _i++) {
            var type = _arr[_i];
            _loop(type);
        }

        // Provide another alias for Trello.delete, since delete is a keyword in
        // javascript
        Trello.del = Trello.delete;

        // Hook up convenience methods for the different collections
        // e.g. Trello.cards(id, params, success, error)

        var _loop2 = function _loop2(collection) {
            Trello[collection] = {
                get: function get(id, params, success, error) {
                    return Trello.get(collection + '/' + id, params, success, error);
                }
            };
        };

        var _arr2 = ['actions', 'cards', 'checklists', 'boards', 'lists', 'members', 'organizations', 'lists'];
        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
            var collection = _arr2[_i2];
            _loop2(collection);
        }

        window.Trello = Trello;
        var localStorage = window.localStorage;


        if (localStorage != null) {
            var storagePrefix = 'trello_';
            readStorage = function readStorage(k) {
                return localStorage[storagePrefix + k];
            };
            writeStorage = function writeStorage(k, value) {
                if (value === null) {
                    delete localStorage[storagePrefix + k];
                    return;
                }
                try {
                    localStorage[storagePrefix + k] = value;
                } catch (error) {} // eslint-disable-line no-empty
            };
        } else {
            readStorage = function readStorage() {};
            writeStorage = function writeStorage() {};
        }

        if (autoAuthorize) {
            Trello.authorize();
        }

        if (authorizeButton) {
            authorizeButtonElement = _react2.default.createElement(_TrelloButton2.default, {
                authorizeMethod: function authorizeMethod() {
                    return Trello.authorize();
                },
                buttonStyle: buttonStyle || 'metamorph',
                buttonColor: buttonColor || 'green',
                buttonText: buttonText || 'Login with Trello',
                buttonCustomStyles: buttonCustomStyles || {}
            });
        }
    };

    wrapper(window, opts);

    return authorizeButtonElement;
};

TrelloClient.propTypes = {
    apiKey: _propTypes2.default.string.isRequired,
    clientVersion: _propTypes2.default.number.isRequired,
    apiEndpoint: _propTypes2.default.string.isRequired,
    authEndpoint: _propTypes2.default.string.isRequired,
    intentEndpoint: _propTypes2.default.string.isRequired,
    authorizeName: _propTypes2.default.string.isRequired,
    authorizeType: _propTypes2.default.string,
    authorizePersist: _propTypes2.default.bool,
    authorizeInteractive: _propTypes2.default.bool,
    authorizeScopeRead: _propTypes2.default.bool,
    authorizeScopeWrite: _propTypes2.default.bool,
    authorizeScopeAccount: _propTypes2.default.bool,
    authorizeExpiration: _propTypes2.default.string,
    authorizeOnSuccess: _propTypes2.default.func.isRequired,
    authorizeOnError: _propTypes2.default.func.isRequired,
    autoAuthorize: _propTypes2.default.bool,
    authorizeButton: _propTypes2.default.bool,
    buttonCustomStyles: _propTypes2.default.object
};

exports.Trello = Trello;
exports.default = TrelloClient;
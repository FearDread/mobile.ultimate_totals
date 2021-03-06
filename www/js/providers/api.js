/*global utconfig */
angular
    .module('provider.api', [])
    .provider('ApiProvider', function () {

        "use strict";

        var config, accounts;

        accounts = {
            pro: false,
            regular: false
        };

        config = {
            account: 'regular',
            apiKey: null,
            httpVerb: 'get',
            base: utconfig.api[utconfig.env].base
        };

        return {
            setBase: function (uri) {
                config.base = uri;
            },

            setApiKey: function (key) {
                config.keys.api = key;
            },

            $get: function ($q, $window, $http, Utils) {

                function getConfig() {
                    return config;
                }

                function setConfig(key, value) {
                    config[key] = value;
                }

                function request(verb, uri, data) {
                    var httpRequest, endpoint, headers;

                    endpoint = config.base + uri;

                    headers = {
                        //'X-User-Authorization': config.keys.api
                    };

                    httpRequest = {
                        method: verb,
                        url: endpoint,
                        port: 4000,
                        headers: headers
                    };

                    if (data !== undefined && data !== null) {
                        httpRequest.data = data;
                    }

                    return $http(httpRequest)
                        .success(function (response, status, headers, config) {
                            if (response.success !== true) {
                                console.log('Api responded with an error: ' + response.error);
                                console.log('When requesting: ' + endpoint);
                                console.log(response);
                            }
                        })
                        .error(function (response, status, headers, config) {
                            console.log('Connection error while trying to access endpoint: ' + endpoint);
                            console.log('Connection status code: ' + status);
                        });
                }

                function index(uri) {

                    return request('get', uri);
                }

                function get(uri, id) {

                    return request('get', uri + '/' + id);
                }

                function post(uri, data) {

                    return request('post', uri, data);
                }

                function update(uri, id, data) {

                    return request('put', uri + '/' + id, data);
                }

                function destroy(uri, id) {

                    return request('delete', uri + '/' + id);
                }

                function call(opts) {
                    var cb, data;

                    cb = [].slice.call(arguments).pop();

                    data = (!opts.id && opts.data) ? opts.data : undefined;

                    opts.uri = (opts.params) ? opts.uri + opts.params : opts.uri;
                    console.log('outside func this = ', this);

                    return (function () {
                        console.log('this = ', this);

                        opts.type.call(opts.uri, data || opts.id || opts.show, (data) ? undefined : opts.data)
                        .success(function (response) {

                            if (response.data && response.data[opts.key]) {
                                if (Utils.isFunc(cb)) {
                                    cb(response.data[opts.key]);
                                }
                            } else {

                                cb(response);
                            }
                        })
                        .error(function (response) {
                            if (response && response.error) {
                                if (Utils.isFunc(cb)) {
                                    cb(response);
                                }
                            }
                        });
                    })();
                }

                return {
                    get: get,
                    call: call,
                    post: post,
                    index: index,
                    update: update,
                    destroy: destroy,
                    request: request,
                    getConfig: getConfig,
                    setConfig: setConfig
                };
            }
        };
    });

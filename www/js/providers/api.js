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

            $get: function ($q, $window, $http) {

                function getConfig() {
                    return config;
                }

                function setConfig(key, value) {
                    config[key] = value;
                }

                function request(verb, uri, data) {
                    // Set variables
                    var httpRequest, endpoint, headers;

                    // Create full endpoint url
                    endpoint = config.base + uri;

                    // Set headers
                    headers = {
                        //'X-User-Authorization': config.keys.api
                    };

                  // Create request object
                    httpRequest = {
                        method: verb,
                        url: endpoint,
                        port: 4000,
                        headers: headers
                    };

                  // Set data if available
                    if (data !== undefined && data !== null) {
                        httpRequest.data = data;
                    }

                    // Return http promise
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

                /**
                 * Index - All elements of a resource
                 *
                 * @param  {string} uri   users | user | events | event
                 * @return {object}       The requested promise
                 */
                function index(uri) {

                    return request('get', uri);
                }

                /**
                 * Show - A specifc element of a resource
                 *
                 * @param  {string} uri   users | user | events | event
                 * @param  {int}    id    1 | 2 | 3 | etc
                 * @return {object}       The requested promise
                 */
                function get(uri, id) {

                    return request('get', uri + '/' + id);
                }

                /**
                 * Store - A new elment of a resource
                 *
                 * @param  {string} uri   users | user | events | event
                 * @param  {object} data  attributes / fields
                 * @return {object}       The requested promise
                 */
                function post(uri, data) {

                    return request('post', uri, data);
                }

                /**
                 * Update - A existing elment of a resource
                 *
                 * @param  {string} uri   users | user | events | event
                 * @param  {int}    id    1 | 2 | 3 | etc
                 * @return {object}       The requested promise
                 */
                function update(uri, id, data) {

                    return request('put', uri + '/' + id, data);
                }

                /**
                 * Destroy the requested resource
                 *
                 * @param  {string} uri   users | user | events | event
                 * @param  {int}    id    1 | 2 | 3 | etc
                 * @return {object}       The requested promise
                 */
                function destroy(uri, id) {

                  return request('delete', uri + '/' + id);
                }

                return {
                    get: get,
                    post: post,
                    update: update,
                    destroy: destroy,
                    request: request,
                    getConfig: getConfig,
                    setConfig: setConfig
                };
            }
        };
    });

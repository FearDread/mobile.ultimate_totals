angular
    .module('prvoider.api', [])
    .provider('ApiProvider', function () {

        "use strict";

        return {

            $get: function ($q, $window, $http) {

                function request(verb, uri, data) {
                    // Set variables
                    var httpRequest, endpoint, headers;

                    // Create full endpoint url
                    endpoint = config.baseUrl + uri;

                    // Set headers
                    headers = {
                        'X-User-Authorization': config.apiKey
                    };

                  // Create request object
                    httpRequest = {
                        method: httpVerb,
                        url: endpoint,
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

                return {
                    request: request
                };
            }
        };
    });

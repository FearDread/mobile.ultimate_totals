/*global utconfig */
angular
    .module('provider.storage', [])
    .provider('StorageProvider', function () {

        "use strict";

        var keys, defaults, storageKey;

        keys = {
          development: 'com.ghap.ultimate.development',
          production: 'com.ghap.ultimate.production'
        };

        storageKey = keys[utconfig.env];

        defaults = {
          auth: {
            id: 0,
            email: null,
            avatar: null,
            username: null,
            firstName: null,
            lastName: null,
            location: null
          },
          teams: {},
          games: {},
          search: {
            query: null,
            results: null
          },
          accounts: {
            pro: null,
            regular: null
          },
          sdata: {
            ranks: null,
            teams: null,
            injuries: null,
            schedule: null
          },
          odds: null,
          schedule: null
        };

        function enforce(obj) {
            var verified, key;

            if (!obj) {

                return defaults;
            }

            verified = {};

            for (key in defaults) {

                if (defaults.hasOwnProperty(key)) {

                    if (obj.hasOwnProperty(key)) {

                        verified[key] = obj[key];

                    } else {

                        verified[key] = defaults[key];
                    }
                }
            }

            return verified;
        }

        function getProperty(object, dotNotationSearch) {
            var searchKeys;

            searchKeys = dotNotationSearch.split(".");

            while (searchKeys.length && object) {

                object = object[searchKeys.shift()];
            }

            if (!object) {
                object = null;
            }

            return object;
        }

        function getData() {
            var data = localStorage.getItem(storageKey);

            data = JSON.parse(data);

            data = enforce(data);

            return data;
        }

        return {

            $get: function () {
                
                function getAll() {

                    return getData();
                }

                function get(search) {
                    var data = getData();

                    return getProperty(data, search);
                }

                function clear() {
                    if (!localStorage) {
                        return false;
                    }

                    localStorage.clear();

                    return true;
                }

                function dump() {
                    var data;

                    data = getData();

                    return {
                        key: storageKey,
                        data: data
                    };
                }

                function set(key, value) {
                    var data;

                    data = getData();

                    data[key] = value;

                    data = JSON.stringify(data);

                    localStorage.setItem(storageKey, data);
                }

                return {
                    get: get,
                    set: set,
                    dump: dump,
                    all: getAll,
                    clear: clear,
                };
            }
        };
    });

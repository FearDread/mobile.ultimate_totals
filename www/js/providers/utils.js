angular
    .module('provider.utils', [])
    .provider('Utils', function () {

        return {

            $get: function ($window, StorageProvider) {
                var delay;

                delay = (function (callback, ms) {
                    var timer = 0;

                    return function (callback, ms) {

                        clearTimeout(timer);

                        timer = setTimeout(callback, ms);
                    };
                })();

                function resize($el, scroll) {
                    if (!$el.height) {
                        $el = $($el);
                    }

                    $(function () {

                        $($window).resize(function () {

                            $el.height($($window).height());

                        });

                        $($window).resize();
                    });

                    if (scroll) {
                        $('html, body').css({
                            'overflow': 'hidden',
                            'height': '100%'
                        });
                    }
                }

                function slugify(text) {
                    return text.toString().toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-]+/g, '')
                        .replace(/\-\-+/g, '-')
                        .replace(/^-+/, '')
                        .replace(/-+$/, '');
                }

                function runOnce(fn, context) {
                    var result;

                    return function () {

                        if (fn) {

                            result = fn.apply(context || this, arguments);

                            fn = null;
                        }

                        return result;
                    };
                }

                function isObj(obj) {

                    return angular.isObject(obj);
                }

                function isType(type, value) {

                    return (typeof value === type);
                }

                function isFunc(fn) {

                    return !!(fn && fn.constructor && fn.call && fn.apply);
                }

                function isStr(str) {

                    return angular.isString(str);
                }

                function isValidEmail(email) {
                    var regex;

                    if (!email) {
                        return false;
                    }

                    regex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i;

                    return regex.exec(email) !== null;
                }

                function random(min, max) {

                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                function size(obj) {
                    var total = 0, key;

                    for (key in obj) {

                        if (obj.hasOwnProperty(key)) {
                            total += 1;
                        }
                    }

                    return total;
                }

                return {
                    size: size,
                    delay: delay,
                    once: runOnce,
                    resize: resize,
                    random: random,
                    slugify: slugify,
                    isStr: isStr,
                    isObj: isObj,
                    isFunc: isFunc,
                    isType: isType,
                    isValidEmail: isValidEmail
                };
            }
        };
    });

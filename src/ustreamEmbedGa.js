/**!
 * Ustream Embed for Google Analytics
 * http://ustream.tv/
 *
 * Ustream Embed for GA extends the Ustream Embed API
 * to transmit the embeded live iframe events to Google Analytics.
 * It supports the Universal and the Classic Google Analytics,
 * and the Google Tag Manager.
 *
 */
var UstreamEmbedGa = (function() {
    var eventsAll = ['live', 'offline', 'finished', 'playing'];

    function getEvent(eventType, eventStatus) {
        var result = eventType;

        if (eventType === 'playing') {
            result = eventStatus ? eventType : 'stopped';
        }

        return result;
    }

    function createObject(UstreamEmbedObj, options) {
        // GA params
        var eventCategory = 'Ustream video',
            eventLabel = '';

        var viewer = UstreamEmbedObj,
            eventsToListen = (function() {
                if (!options) {
                    return eventsAll;
                }

                if (!options.hasOwnProperty('listenTo')) {
                    return eventsAll;
                }

                if (Object.prototype.toString.call(options.listenTo) !== '[object Array]') {
                    return eventsAll;
                }

                if (!options.listenTo.length) {
                    return eventsAll;
                }

                return options.listenTo;
            })();

        function handleListeners(task) {
            var length = eventsToListen.length;
            var i;

            for (i = 0; i < length; i++) {
                if (task === 'add' || !task) {
                    viewer.addListener(eventsToListen[i], listener);
                } else {
                    viewer.removeListener(eventsToListen[i], listener);
                }
            }
        }

        function listener(eventType, eventStatus) {
            var eventAction = getEvent(eventType, eventStatus);

            if (window.dataLayer) {
                dataLayer.push({
                    'event': 'ustreamTriggerEvent',
                    'ustreamEventCategory': eventCategory,
                    'ustreamEventAction': eventAction,
                    'ustreamEventLabel': eventLabel
                });

                return;
            }

            if (window.ga) {
                ga('send', 'event', {
                    eventCategory: eventCategory,
                    eventAction: eventAction,
                    eventLabel: eventLabel
                });

                return;
            }

            if (window._gaq) {
                _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel]);
            }
        }

        function initialize() {
            viewer.getProperty('content', function(content) {
                eventLabel = content[0] + '/' + content[1];
                handleListeners('add');
            });
        }

        initialize();

        return {
            destroy: handleListeners.bind(this, 'remove'),
            init: handleListeners.bind(this, 'add')
        };
    }

    function initialize(UstreamEmbedObj, options) {
        if (!window.UstreamEmbed) {
            return;
        }

        if (!window.ga && !window._gaq && !window.dataLayer) {
            return;
        }

        return createObject(UstreamEmbedObj, options);
    }

    return window.UstreamEmbedGa = initialize;
})();

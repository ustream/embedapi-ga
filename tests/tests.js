window.UstreamEmbed = (function() {
    return {
        eventCallbacks: {},
        addListener: function(event, cb) {
            this.eventCallbacks[event] = cb;
        },
        removeListener: function() {
            this.eventCallbacks = {};
        },
        trigger: function(event) {
            if (this.eventCallbacks[event]) {
                this.eventCallbacks[event].call(this, event, true);
            }
        },
        getProperty: function(event, cb) {
            cb('channel/12345');
        }
    };
})();

suite('Event listeners', function() {
    test('GA called on any event', function() {
        window.ga = sinon.spy();
        UstreamEmbedGa(UstreamEmbed);

        UstreamEmbed.trigger('live');
        sinon.assert.calledOnce(ga);

        window.ga = undefined;
    });

    test('Classical Google Analytics', function() {
        window.ga = sinon.spy();

        UstreamEmbedGa(UstreamEmbed);
        UstreamEmbed.trigger('live');

        sinon.assert.calledOnce(ga);
        window.ga = undefined;
    });

    test('Universal Google Analytics', function() {
        window._gaq = {};
        window._gaq.push = sinon.spy();
        UstreamEmbedGa(UstreamEmbed);

        UstreamEmbed.trigger('playing');
        sinon.assert.calledOnce(_gaq.push);

        window._gaq = undefined;
    });

    test('Google Tag Manager', function() {
        window.dataLayer = {};
        window.dataLayer.push = sinon.spy();
        UstreamEmbedGa(UstreamEmbed);

        UstreamEmbed.trigger('offline');
        sinon.assert.calledOnce(dataLayer.push);

        window.dataLayer = undefined;
    });
});

suite('Public methods', function() {
    test('destroy', function() {
        window.ga = sinon.spy();
        var ustreamGa = UstreamEmbedGa(UstreamEmbed);

        ustreamGa.destroy();
        UstreamEmbed.trigger('offline');
        sinon.assert.notCalled(window.ga);

        window.ga = undefined;
    });

    test('initialize', function() {
        window.ga = sinon.spy();
        var ustreamGa = UstreamEmbedGa(UstreamEmbed);

        ustreamGa.destroy();
        UstreamEmbed.trigger('offline');
        ustreamGa.init();
        UstreamEmbed.trigger('offline');
        sinon.assert.calledOnce(window.ga);

        window.ga = undefined;
    });
});

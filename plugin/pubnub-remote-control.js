/*!
 * reveal.js PubNub Remote Control Plugin v. 0.1.3
 * https://github.com/salvatorecordiano/reveal-js-pubnub-remote-control-plugin/
 *
 * Copyright (C) 2016-2017 Salvatore Cordiano, http://www.salvatorecordiano.it/
 * Released under the MIT license
 */

(function() {

    'use strict';

    var PubnubRemoteControl = (function () {

        var defaultProperties = {
            subscribeKey: null,
            publishKey: null,
            inputChannel: 'input',
            outputChannel: 'output'
        };

        var thiz = function (customProperties) {

            var options = {};
            var pubnub;

            if (customProperties && typeof customProperties === 'object') {
                extendDefaultProperties(options, customProperties);
            }

            initPubNub();
            options.publishKey && initReveal();

            function initPubNub() {
                pubnub = new PubNub({ publishKey: options.publishKey, subscribeKey: options.subscribeKey, userId:options.userId, ssl: true });
                pubnub.subscribe({ channels: [ options.inputChannel ] });
                pubnub.addListener({
                    message: function(event) {
                        processInput(event.message);
                    }
                });
            }

            function initReveal() {
                var indices = Reveal.getIndices();
                sendUpdate(indices.h, indices.v);

                Reveal.addEventListener('slidechanged', function(event) {
                    sendUpdate(event.indexh, event.indexv);
                });
            }

            function sendUpdate(slide, part)
            {
                pubnub.publish({
                    channel : options.outputChannel,
                    message : {slide: (slide+1), part: (part+1)}
                });
            }

            function extendDefaultProperties(options, customProperties) {
                var property;
                for (var property in defaultProperties) {
                    if (defaultProperties.hasOwnProperty(property)) {
                        options[property] = defaultProperties[property];
                    }
                }
                for (property in customProperties) {
                    if (customProperties.hasOwnProperty(property)) {
                        options[property] = customProperties[property];
                    }
                }
            }

            function processInput(input) {
                if (typeof input === 'string') {
                    try {
                        input = JSON.parse(input);
                    } catch (e) {
                        console.error('Error parsing JSON:', e);
                    }
                }
                console.log(input);
                //console.log(typeof input);
                let cond1 = input;
                let cond2 = typeof input === 'object';
                let cond3 = input.button;
                if(cond1 && cond2 && cond3) {
                    switch (input.button) {
                        case 'left' :
                            Reveal.navigateLeft();
                            break;
                        case 'right' :
                            Reveal.navigateRight();
                            break;
                        case 'up' :
                            Reveal.navigateUp();
                            break;
                        case 'down' :
                            Reveal.navigateDown();
                            break;
                    }
                }
            }
        };

        return thiz;

    })();

    //new PubnubRemoteControl(Reveal.getConfig().pubnubRemoteControl);
    Reveal.getConfig().pubnubRemoteControl && new PubnubRemoteControl(Reveal.getConfig().pubnubRemoteControl);

}());

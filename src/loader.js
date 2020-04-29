/*
 * ----------------------------------------------------------
 * root.Plugin : 0.3.4 : 2015-03-26
 * ----------------------------------------------------------
 * https://github.com/mudcube/root.js
 * ----------------------------------------------------------
 * Inspired by javax.sound.midi (albeit a super simple version):
 *   http://docs.oracle.com/javase/6/docs/api/javax/sound/midi/package-summary.html
 * ----------------------------------------------------------
 * Technologies
 * ----------------------------------------------------------
 *  Web MIDI API - no native support yet (jazzplugin)
 *  Web Audio API - firefox 25+, chrome 10+, safari 6+, opera 15+
 *  HTML5 Audio Tag - ie 9+, firefox 3.5+, chrome 4+, safari 4+, opera 9.5+, ios 4+, android 2.3+
 * ----------------------------------------------------------
 */

import root from './root';
import { audioDetect, loadScript, request } from './utils';

root.Soundfont = {};
root.DEBUG = true;
root.USE_XHR = true;
root.soundfontUrl = './soundfont/';

/*
 * root.loadPlugin({
 *   onsuccess: function() { },
 *   onprogress: function(state, percent) { },
 *   targetFormat: 'mp3', // optionally can force to use MP3 (for instance on mobile networks)
 *   instrument: 'acoustic_grand_piano', // or 1 (default)
 *   instruments: [ 'acoustic_grand_piano', 'acoustic_guitar_nylon' ] // or multiple instruments
 * })
 */

root.loadPlugin = function (opts) {
  if (typeof opts === 'function') {
    opts = { onsuccess: opts };
  }

  root.soundfontUrl = opts.soundfontUrl || root.soundfontUrl;

  // / Detect the best type of audio to use
  audioDetect(function (supports) {
    const { hash } = window.location;
    let api = '';

    // / use the most appropriate plugin if not specified
    if (supports[opts.api]) {
      api = opts.api;
    } else if (supports[hash.substr(1)]) {
      api = hash.substr(1);
    } else if (supports.webmidi) {
      api = 'webmidi';
    } else if (window.AudioContext) {
      // Chrome
      api = 'webaudio';
    } else if (window.Audio) {
      // Firefox
      api = 'audiotag';
    }

    if (connect[api]) {
      // / use audio/ogg when supported
      let audioFormat;
      if (opts.targetFormat) {
        audioFormat = opts.targetFormat;
      } else {
        // use best quality
        audioFormat = supports['audio/ogg'] ? 'ogg' : 'mp3';
      }

      // / load the specified plugin
      root.__api = api;
      root.__audioFormat = audioFormat;
      root.supports = supports;
      root.loadResource(opts);
    }
  });
};

/*
 *root.loadResource({
 *  onsuccess: function() { },
 *  onprogress: function(state, percent) { },
 *  instrument: 'banjo'
 *})
 */

root.loadResource = function (opts) {
  let instruments =
    opts.instruments || opts.instrument || 'acoustic_grand_piano';
  // /
  if (typeof instruments !== 'object') {
    if (instruments || instruments === 0) {
      instruments = [instruments];
    } else {
      instruments = [];
    }
  }
  // / convert numeric ids into strings
  for (let i = 0; i < instruments.length; i++) {
    const instrument = instruments[i];
    if (instrument === +instrument) {
      // is numeric
      if (root.GM.byId[instrument]) {
        instruments[i] = root.GM.byId[instrument].id;
      }
    }
  }
  // /
  opts.format = root.__audioFormat;
  opts.instruments = instruments;
  // /
  connect[root.__api](opts);
};

var connect = {
  webmidi(opts) {
    // cant wait for this to be standardized!
    root.WebMIDI.connect(opts);
  },
  audiotag(opts) {
    /*
     * works ok, kinda like a drunken tuna fish, across the board
     * http://caniuse.com/audio
     */
    requestQueue(opts, 'AudioTag');
  },
  webaudio(opts) {
    /*
     * works awesome! safari, chrome and firefox support
     * http://caniuse.com/web-audio
     */
    requestQueue(opts, 'WebAudio');
  },
};

var requestQueue = function (opts, context) {
  const audioFormat = opts.format;
  const { instruments } = opts;
  const { onprogress } = opts;
  const { onerror } = opts;
  // /
  const { length } = instruments;
  let pending = length;
  const waitForEnd = function () {
    if (!--pending) {
      onprogress && onprogress('load', 1.0);
      root[context].connect(opts);
    }
  };
  // /
  for (let i = 0; i < length; i++) {
    var instrumentId = instruments[i];
    if (root.Soundfont[instrumentId]) {
      // already loaded
      waitForEnd();
    } else {
      // needs to be requested
      sendRequest(
        instruments[i],
        audioFormat,
        function (evt, progress) {
          const fileProgress = progress / length;
          const queueProgress = (length - pending) / length;
          onprogress &&
            onprogress('load', fileProgress + queueProgress, instrumentId);
        },
        function () {
          waitForEnd();
        },
        onerror
      );
    }
  }
};

var sendRequest = function (
  instrumentId,
  audioFormat,
  onprogress,
  onsuccess,
  onerror
) {
  const soundfontPath = `${root.soundfontUrl + instrumentId}-${audioFormat}.js`;
  if (root.USE_XHR) {
    request({
      url: soundfontPath,
      format: 'text',
      onerror,
      onprogress,
      onsuccess(event, responseText) {
        const script = document.createElement('script');
        script.language = 'javascript';
        script.type = 'text/javascript';
        script.text = responseText;
        document.body.appendChild(script);
        onsuccess();
      },
    });
  } else {
    loadScript.add({
      url: soundfontPath,
      verify: `root.Soundfont["${instrumentId}"]`,
      onerror,
      onsuccess() {
        onsuccess();
      },
    });
  }
};

root.setDefaultPlugin = function (midi) {
  for (const key in midi) {
    root[key] = midi[key];
  }
};

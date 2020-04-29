/*
 * ----------------------------------------------------------------------
 * Web MIDI API - Native Soundbanks
 * ----------------------------------------------------------------------
 * http://webaudio.github.io/web-midi-api/
 * ----------------------------------------------------------------------
 */
import root from '../root';

(function () {
  let plugin = null;
  let output = null;
  const midi = (root.WebMIDI = { api: 'webmidi' });
  midi.send = function (data, delay) {
    // set channel volume
    output.send(data, delay * 1000);
  };

  midi.setController = function (channel, type, value, delay) {
    output.send([channel, type, value], delay * 1000);
  };

  midi.setVolume = function (channel, volume, delay) {
    // set channel volume
    output.send([0xb0 + channel, 0x07, volume], delay * 1000);
  };

  midi.programChange = function (channel, program, delay) {
    // change patch (instrument)
    output.send([0xc0 + channel, program], delay * 1000);
  };

  midi.pitchBend = function (channel, program, delay) {
    // pitch bend
    output.send([0xe0 + channel, program], delay * 1000);
  };

  midi.noteOn = function (channel, note, velocity, delay) {
    output.send([0x90 + channel, note, velocity], delay * 1000);
  };

  midi.noteOff = function (channel, note, delay) {
    output.send([0x80 + channel, note, 0], delay * 1000);
  };

  midi.chordOn = function (channel, chord, velocity, delay) {
    for (let n = 0; n < chord.length; n++) {
      const note = chord[n];
      output.send([0x90 + channel, note, velocity], delay * 1000);
    }
  };

  midi.chordOff = function (channel, chord, delay) {
    for (let n = 0; n < chord.length; n++) {
      const note = chord[n];
      output.send([0x80 + channel, note, 0], delay * 1000);
    }
  };

  midi.stopAllNotes = function () {
    output.cancel();
    for (let channel = 0; channel < 16; channel++) {
      output.send([0xb0 + channel, 0x7b, 0]);
    }
  };

  midi.connect = function (opts) {
    root.setDefaultPlugin(midi);
    const errFunction = function (err) {
      // well at least we tried!
      if (window.AudioContext) {
        // Chrome
        opts.api = 'webaudio';
      } else if (window.Audio) {
        // Firefox
        opts.api = 'audiotag';
      } else {
        // no support
        return err;
      }
      root.loadPlugin(opts);
    };
    // /
    navigator.requestMIDIAccess().then(function (access) {
      plugin = access;
      const pluginOutputs = plugin.outputs;
      if (typeof pluginOutputs === 'function') {
        // Chrome pre-43
        output = pluginOutputs()[0];
      } else {
        // Chrome post-43
        output = pluginOutputs[0];
      }
      if (output === undefined) {
        // nothing there...
        errFunction();
      } else {
        opts.onsuccess && opts.onsuccess();
      }
    }, errFunction);
  };
})();

/*
 * ----------------------------------------------------------------------
 * AudioTag <audio> - OGG or MPEG Soundbank
 * ----------------------------------------------------------------------
 * http://dev.w3.org/html5/spec/Overview.html#the-audio-element
 * ----------------------------------------------------------------------
 */
import root from '../root';

window.Audio &&
  (function () {
    const midi = (root.AudioTag = { api: 'audiotag' });
    const noteToKey = {};
    let volume = 127; // floating point
    let bufferNid = -1; // current channel
    const audioBuffers = []; // the audio channels
    const notesOn = []; // instrumentId + noteId that is currently playing in each 'channel', for routing noteOff/chordOff calls
    const notes = {}; // the piano keys
    for (let nid = 0; nid < 12; nid++) {
      audioBuffers[nid] = new window.Audio();
    }

    const playChannel = function (channel, note) {
      if (!root.channels[channel]) return;
      const { instrument } = root.channels[channel];
      const instrumentId = root.GM.byId[instrument].id;
      note = notes[note];
      if (note) {
        const instrumentNoteId = `${instrumentId}${note.id}`;
        const nid = (bufferNid + 1) % audioBuffers.length;
        const audio = audioBuffers[nid];
        notesOn[nid] = instrumentNoteId;
        if (!root.Soundfont[instrumentId]) {
          if (root.DEBUG) {
            console.log('404', instrumentId);
          }
          return;
        }
        audio.src = root.Soundfont[instrumentId][note.id];
        audio.volume = volume / 127;
        audio.play();
        bufferNid = nid;
      }
    };

    const stopChannel = function (channel, note) {
      if (!root.channels[channel]) return;
      const { instrument } = root.channels[channel];
      const instrumentId = root.GM.byId[instrument].id;
      note = notes[note];
      if (note) {
        const instrumentNoteId = `${instrumentId}${note.id}`;
        for (let i = 0, len = audioBuffers.length; i < len; i++) {
          const nid = (i + bufferNid + 1) % len;
          const cId = notesOn[nid];
          if (cId && cId === instrumentNoteId) {
            audioBuffers[nid].pause();
            notesOn[nid] = null;
            return;
          }
        }
      }
    };

    midi.audioBuffers = audioBuffers;
    midi.send = function (data, delay) {};
    midi.setController = function (channel, type, value, delay) {};
    midi.setVolume = function (channel, n) {
      volume = n; // - should be channel specific volume
    };

    midi.programChange = function (channel, program) {
      root.channels[channel].instrument = program;
    };

    midi.pitchBend = function (channel, program, delay) {};

    midi.noteOn = function (channel, note, velocity, delay) {
      const id = noteToKey[note];
      if (!notes[id]) return;
      if (delay) {
        return setTimeout(function () {
          playChannel(channel, id);
        }, delay * 1000);
      }
      playChannel(channel, id);
    };

    midi.noteOff = function (channel, note, delay) {
      /*
       *      var id = noteToKey[note]
       *      if (!notes[id]) return
       *      if (delay) {
       *        return setTimeout(function() {
       *          stopChannel(channel, id)
       *        }, delay * 1000)
       *      } else {
       *        stopChannel(channel, id)
       *      }
       */
    };

    midi.chordOn = function (channel, chord, velocity, delay) {
      for (let idx = 0; idx < chord.length; idx++) {
        const n = chord[idx];
        var id = noteToKey[n];
        if (!notes[id]) continue;
        if (delay) {
          return setTimeout(function () {
            playChannel(channel, id);
          }, delay * 1000);
        }
        playChannel(channel, id);
      }
    };

    midi.chordOff = function (channel, chord, delay) {
      for (let idx = 0; idx < chord.length; idx++) {
        const n = chord[idx];
        var id = noteToKey[n];
        if (!notes[id]) continue;
        if (delay) {
          return setTimeout(function () {
            stopChannel(channel, id);
          }, delay * 1000);
        }
        stopChannel(channel, id);
      }
    };

    midi.stopAllNotes = function () {
      for (let nid = 0, { length } = audioBuffers; nid < length; nid++) {
        audioBuffers[nid].pause();
      }
    };

    midi.connect = function (opts) {
      root.setDefaultPlugin(midi);
      // /
      for (const key in root.keyToNote) {
        noteToKey[root.keyToNote[key]] = key;
        notes[key] = { id: key };
      }
      // /
      opts.onsuccess && opts.onsuccess();
    };
  })();

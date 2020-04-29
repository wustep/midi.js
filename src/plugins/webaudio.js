/*
 * ----------------------------------------------------------
 * Web Audio API - OGG or MPEG Soundbank
 * ----------------------------------------------------------
 * http://webaudio.github.io/web-audio-api/
 * ----------------------------------------------------------
 */
import root from '../root';

// REF: http://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

window.AudioContext &&
  (function () {
    // var audioContext = null // new AudioContext()
    const useStreamingBuffer = false; // !!audioContext.createMediaElementSource
    const midi = (root.WebAudio = { api: 'webaudio' });
    let ctx; // audio context
    const sources = {};
    const effects = {};
    let masterVolume = 127;
    const audioBuffers = {};
    // /
    midi.audioBuffers = audioBuffers;
    midi.send = function (data, delay) {};
    midi.setController = function (channelId, type, value, delay) {};

    midi.setVolume = function (channelId, volume, delay) {
      if (delay) {
        setTimeout(function () {
          masterVolume = volume;
        }, delay * 1000);
      } else {
        masterVolume = volume;
      }
    };

    midi.programChange = function (channelId, program, delay) {
      /*
       *      if (delay) {
       *        return setTimeout(function() {
       *          var channel = root.channels[channelId]
       *          channel.instrument = program
       *        }, delay)
       *      } else {
       */
      const channel = root.channels[channelId];
      channel.instrument = program;
      //      }
    };

    midi.pitchBend = function (channelId, program, delay) {
      /*
       *      if (delay) {
       *        setTimeout(function() {
       *          var channel = root.channels[channelId]
       *          channel.pitchBend = program
       *        }, delay)
       *      } else {
       */
      const channel = root.channels[channelId];
      channel.pitchBend = program;
      //      }
    };

    midi.noteOn = function (channelId, noteId, velocity, delay) {
      delay = delay || 0;

      // / check whether the note exists
      const channel = root.channels[channelId];
      const { instrument } = channel;
      const bufferId = `${instrument}${noteId}`;
      const buffer = audioBuffers[bufferId];
      if (!buffer) {
        //        console.log(midi.GM.byId[instrument].id, instrument, channelId)
        return;
      }

      // / convert relative delay to absolute delay
      if (delay < ctx.currentTime) {
        delay += ctx.currentTime;
      }

      // / create audio buffer
      let source;
      if (useStreamingBuffer) {
        source = ctx.createMediaElementSource(buffer);
      } else {
        // XMLHTTP buffer
        source = ctx.createBufferSource();
        source.buffer = buffer;
      }

      // / add effects to buffer
      if (effects) {
        let chain = source;
        for (const key in effects) {
          chain.connect(effects[key].input);
          chain = effects[key];
        }
      }

      // / add gain + pitchShift
      const gain = (velocity / 127) * (masterVolume / 127) * 2 - 1;
      source.connect(ctx.destination);
      source.playbackRate.value = 1; // pitch shift
      source.gainNode = ctx.createGain(); // gain
      source.gainNode.connect(ctx.destination);
      source.gainNode.gain.value = Math.min(1.0, Math.max(-1.0, gain));
      source.connect(source.gainNode);
      // /
      if (useStreamingBuffer) {
        if (delay) {
          return setTimeout(function () {
            buffer.currentTime = 0;
            buffer.play();
          }, delay * 1000);
        }
        buffer.currentTime = 0;
        buffer.play();
      } else {
        source.start(delay || 0);
      }
      // /
      sources[`${channelId}${noteId}`] = source;
      // /
      return source;
    };

    midi.noteOff = function (channelId, noteId, delay) {
      delay = delay || 0;

      // / check whether the note exists
      const channel = root.channels[channelId];
      const { instrument } = channel;
      const bufferId = `${instrument}${noteId}`;
      const buffer = audioBuffers[bufferId];
      if (buffer) {
        if (delay < ctx.currentTime) {
          delay += ctx.currentTime;
        }
        // /
        const source = sources[`${channelId}${noteId}`];
        if (source) {
          if (source.gainNode) {
            /*
             * @Miranet: 'the values of 0.2 and 0.3 could of course be used as
             * a 'release' parameter for ADSR like time settings.'
             * add { 'metadata': { release: 0.3 } } to soundfont files
             */
            const { gain } = source.gainNode;
            gain.linearRampToValueAtTime(gain.value, delay);
            gain.linearRampToValueAtTime(-1.0, delay + 0.3);
          }
          // /
          if (useStreamingBuffer) {
            if (delay) {
              setTimeout(function () {
                buffer.pause();
              }, delay * 1000);
            } else {
              buffer.pause();
            }
          } else if (source.noteOff) {
            source.noteOff(delay + 0.5);
          } else {
            source.stop(delay + 0.5);
          }
          // /
          delete sources[`${channelId}${noteId}`];
          // /
          return source;
        }
      }
    };

    midi.chordOn = function (channel, chord, velocity, delay) {
      const res = {};
      for (var n = 0, note, len = chord.length; n < len; n++) {
        res[(note = chord[n])] = midi.noteOn(channel, note, velocity, delay);
      }
      return res;
    };

    midi.chordOff = function (channel, chord, delay) {
      const res = {};
      for (var n = 0, note, len = chord.length; n < len; n++) {
        res[(note = chord[n])] = midi.noteOff(channel, note, delay);
      }
      return res;
    };

    midi.stopAllNotes = function () {
      for (const sid in sources) {
        let delay = 0;
        if (delay < ctx.currentTime) {
          delay += ctx.currentTime;
        }
        const source = sources[sid];
        source.gain.linearRampToValueAtTime(1, delay);
        source.gain.linearRampToValueAtTime(0, delay + 0.3);
        if (source.noteOff) {
          // old api
          source.noteOff(delay + 0.3);
        } else {
          // new api
          source.stop(delay + 0.3);
        }
        delete sources[sid];
      }
    };

    midi.setEffects = function (list) {
      if (ctx.tunajs) {
        for (let n = 0; n < list.length; n++) {
          const data = list[n];
          const effect = new ctx.tunajs[data.type](data);
          effect.connect(ctx.destination);
          effects[data.type] = effect;
        }
      } else {
        return console.log('Effects module not installed.');
      }
    };

    midi.connect = function (opts) {
      root.setDefaultPlugin(midi);
      midi.setContext(ctx || createAudioContext(), opts.onsuccess);
    };

    midi.getContext = function () {
      return ctx;
    };

    midi.setContext = function (newCtx, onload, onprogress, onerror) {
      ctx = newCtx;

      // / tuna.js effects module - https://github.com/Dinahmoe/tuna
      if (typeof window.Tuna !== 'undefined' && !ctx.tunajs) {
        ctx.tunajs = new window.Tuna(ctx);
      }

      // / loading audio files
      const urls = [];
      const notes = root.keyToNote;
      for (const key in notes) urls.push(key);
      // /
      const waitForEnd = function (instrument) {
        for (const key in bufferPending) {
          // has pending items
          if (bufferPending[key]) return;
        }
        // /
        if (onload) {
          // run onload once
          onload();
          onload = null;
        }
      };
      // /
      const requestAudio = function (soundfont, instrumentId, index, key) {
        const url = soundfont[key];
        if (url) {
          bufferPending[instrumentId]++;
          loadAudio(
            url,
            function (buffer) {
              buffer.id = key;
              const noteId = root.keyToNote[key];
              audioBuffers[`${instrumentId}${noteId}`] = buffer;
              // /
              if (--bufferPending[instrumentId] === 0) {
                /*
                 * var percent = index / 87
                 *              console.log(midi.GM.byId[instrumentId], 'processing: ', percent)
                 */
                soundfont.isLoaded = true;
                waitForEnd(instrument);
              }
            },
            function (err) {
              console.error(err);
            }
          );
        }
      };
      // /
      var bufferPending = {};
      for (var instrument in root.Soundfont) {
        const soundfont = root.Soundfont[instrument];
        if (soundfont.isLoaded) {
          continue;
        }
        // /
        const synth = root.GM.byName[instrument];
        const instrumentId = synth.number;
        // /
        bufferPending[instrumentId] = 0;
        // /
        for (let index = 0; index < urls.length; index++) {
          const key = urls[index];
          requestAudio(soundfont, instrumentId, index, key);
        }
      }
      // /
      setTimeout(waitForEnd, 1);
    };

    /*
     * Load audio file: streaming | base64 | arraybuffer
     * ----------------------------------------------------------------------
     */
    function loadAudio(url, onload, onerror) {
      if (useStreamingBuffer) {
        const audio = new window.Audio();
        audio.src = url;
        audio.controls = false;
        audio.autoplay = false;
        audio.preload = false;
        audio.addEventListener('canplay', function () {
          onload && onload(audio);
        });
        audio.addEventListener('error', function (err) {
          onerror && onerror(err);
        });
        document.body.appendChild(audio);
      } else if (url.indexOf('data:audio') === 0) {
        // Base64 string
        const base64 = url.split(',')[1];
        const buffer = base64ToArrayBuffer(base64);
        ctx.decodeAudioData(buffer, onload, onerror);
      } else {
        // XMLHTTP buffer
        const request = new window.XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
          ctx.decodeAudioData(request.response, onload, onerror);
        };
        request.send();
      }
    }

    function createAudioContext() {
      return new (window.AudioContext || window.webkitAudioContext)();
    }
  })();

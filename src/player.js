/*
 *----------------------------------------------------------
 *midi.Player : 0.3.1 : 2015-03-26
 *----------------------------------------------------------
 *https://github.com/mudcube/midi.js
 *----------------------------------------------------------
 */

import { MidiFile, Replayer } from './jasmid';
import root from './root';

(function () {
  root.Player = {};
  const player = root.Player;
  player.currentTime = 0;
  player.endTime = 0;
  player.restart = 0;
  player.playing = false;
  player.timeWarp = 1;
  player.startDelay = 0;
  player.BPM = 120;

  player.start = player.resume = function (onsuccess) {
    if (player.currentTime < -1) {
      player.currentTime = -1;
    }
    startAudio(player.currentTime, null, onsuccess);
  };

  player.pause = function () {
    const tmp = player.restart;
    stopAudio();
    player.restart = tmp;
  };

  player.stop = function () {
    stopAudio();
    player.restart = 0;
    player.currentTime = 0;
  };

  player.addListener = function (onsuccess) {
    onMidiEvent = onsuccess;
  };

  player.removeListener = function () {
    onMidiEvent = undefined;
  };

  player.clearAnimation = function () {
    if (player.animationFrameId) {
      window.cancelAnimationFrame(player.animationFrameId);
    }
  };

  player.setAnimation = function (callback) {
    let currentTime = 0;
    let tOurTime = 0;
    let tTheirTime = 0;
    //
    player.clearAnimation();
    // /
    var frame = function () {
      player.animationFrameId = window.requestAnimationFrame(frame);
      // /
      if (player.endTime === 0) {
        return;
      }
      if (player.playing) {
        currentTime =
          tTheirTime === player.currentTime ? tOurTime - Date.now() : 0;
        if (player.currentTime === 0) {
          currentTime = 0;
        } else {
          currentTime = player.currentTime - currentTime;
        }
        if (tTheirTime !== player.currentTime) {
          tOurTime = Date.now();
          tTheirTime = player.currentTime;
        }
      } else {
        // paused
        currentTime = player.currentTime;
      }
      // /
      const { endTime } = player;
      // var percent = currentTime / endTime
      const total = currentTime / 1000;
      const minutes = total / 60;
      const seconds = total - minutes * 60;
      const t1 = minutes * 60 + seconds;
      const t2 = endTime / 1000;
      // /
      if (t2 - t1 < -1.0) {
      } else {
        callback({
          now: t1,
          end: t2,
          events: noteRegistrar,
        });
      }
    };
    // /
    window.requestAnimationFrame(frame);
  };

  // helpers

  player.loadMidiFile = function (onsuccess, onprogress, onerror) {
    try {
      // console.log(MidiFile(player.currentData), new Replayer(MidiFile(player.currentData), player.timeWarp, null, player.BPM))
      player.replayer = new Replayer(
        MidiFile(player.currentData),
        player.timeWarp,
        null,
        player.BPM
      );
      player.data = player.replayer.getData();
      player.endTime = getLength();
      // /
      root.loadPlugin({
        // instruments: player.getFileInstruments(),
        onsuccess,
        onprogress,
        onerror,
      });
    } catch (event) {
      console.error(event);
      onerror && onerror(event);
    }
  };

  player.loadFile = function (file, onsuccess, onprogress, onerror) {
    player.stop();
    if (file.indexOf('base64,') !== -1) {
      const data = window.atob(file.split(',')[1]);
      player.currentData = data;
      player.loadMidiFile(onsuccess, onprogress, onerror);
    } else {
      const fetch = new window.XMLHttpRequest();
      fetch.open('GET', file);
      fetch.overrideMimeType('text/plain; charset=x-user-defined');
      fetch.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            const t = this.responseText || '';
            const ff = [];
            const mx = t.length;
            const scc = String.fromCharCode;
            for (let z = 0; z < mx; z++) {
              ff[z] = scc(t.charCodeAt(z) & 255);
            }
            // /
            const data = ff.join('');
            player.currentData = data;
            player.loadMidiFile(onsuccess, onprogress, onerror);
          } else {
            onerror && onerror('Unable to load MIDI file');
          }
        }
      };
      fetch.send();
    }
  };

  player.getFileInstruments = function () {
    const instruments = {};
    const programs = {};
    for (let n = 0; n < player.data.length; n++) {
      const { event } = player.data[n][0];
      if (event.type !== 'channel') {
        continue;
      }
      const { channel } = event;
      switch (event.subtype) {
        case 'controller':
          //        console.log(event.channel, root.defineControl[event.controllerType], event.value)
          break;
        case 'programChange':
          programs[channel] = event.programNumber;
          break;
        case 'noteOn':
          var program = programs[channel];
          var gm = root.GM.byId[isFinite(program) ? program : channel];
          instruments[gm.id] = true;
          break;
      }
    }
    const ret = [];
    for (const key in instruments) {
      ret.push(key);
    }
    return ret;
  };

  // Playing the audio

  const eventQueue = []; // hold events to be triggered
  let queuedTime; //
  let startTime = 0; // to measure time elapse
  var noteRegistrar = {}; // get event for requested note
  let onMidiEvent; // listener
  const scheduleTracking = function (
    channel,
    note,
    currentTime,
    offset,
    message,
    velocity,
    time
  ) {
    return setTimeout(function () {
      const data = {
        channel,
        note,
        now: currentTime,
        end: player.endTime,
        message,
        velocity,
      };
      //
      if (message === 128) {
        delete noteRegistrar[note];
      } else {
        noteRegistrar[note] = data;
      }
      if (onMidiEvent) {
        onMidiEvent(data);
      }
      player.currentTime = currentTime;
      // /
      eventQueue.shift();
      // /
      if (eventQueue.length < 1000) {
        startAudio(queuedTime, true);
      } else if (
        player.currentTime === queuedTime &&
        queuedTime < player.endTime
      ) {
        // grab next sequence
        startAudio(queuedTime, true);
      }
    }, currentTime - offset);
  };

  const getContext = function () {
    if (root.api === 'webaudio') {
      return root.WebAudio.getContext();
    }
    player.ctx = { currentTime: 0 };

    return player.ctx;
  };

  var getLength = function () {
    const { data } = player;
    const { length } = data;
    let totalTime = 0.5;
    for (let n = 0; n < length; n++) {
      totalTime += data[n][1];
    }
    return totalTime;
  };

  let __now;
  const getNow = function () {
    if (window.performance && window.performance.now) {
      return window.performance.now();
    }
    return Date.now();
  };

  var startAudio = function (currentTime, fromCache, onsuccess) {
    if (!player.replayer) {
      return;
    }
    if (!fromCache) {
      if (typeof currentTime === 'undefined') {
        currentTime = player.restart;
      }
      // /
      player.playing && stopAudio();
      player.playing = true;
      player.data = player.replayer.getData();
      player.endTime = getLength();
    }
    // /
    let note;
    let offset = 0;
    let messages = 0;
    const { data } = player;
    const ctx = getContext();
    const { length } = data;
    //
    queuedTime = 0.5;
    // /
    // var interval = eventQueue[0] && eventQueue[0].interval || 0
    const foffset = currentTime - player.currentTime;
    // /
    if (root.api !== 'webaudio') {
      // set currentTime on ctx
      const now = getNow();
      __now = __now || now;
      ctx.currentTime = (now - __now) / 1000;
    }
    // /
    startTime = ctx.currentTime;
    // /
    for (let n = 0; n < length && messages < 100; n++) {
      const obj = data[n];
      if ((queuedTime += obj[1]) <= currentTime) {
        offset = queuedTime;
        continue;
      }
      // /
      currentTime = queuedTime - offset;
      // /
      const { event } = obj[0];
      if (event.type !== 'channel') {
        continue;
      }
      // /
      const channelId = event.channel;
      const channel = root.channels[channelId];
      const delay =
        ctx.currentTime + (currentTime + foffset + player.startDelay) / 1000;
      const queueTime = queuedTime - offset + player.startDelay;
      switch (event.subtype) {
        case 'controller':
          root.setController(
            channelId,
            event.controllerType,
            event.value,
            delay
          );
          break;
        case 'programChange':
          root.programChange(channelId, event.programNumber, delay);
          break;
        case 'pitchBend':
          root.pitchBend(channelId, event.value, delay);
          break;
        case 'noteOn':
          if (channel.mute) break;
          note = event.noteNumber - (player.MIDIOffset || 0);
          eventQueue.push({
            event,
            time: queueTime,
            source: root.noteOn(
              channelId,
              event.noteNumber,
              event.velocity,
              delay
            ),
            interval: scheduleTracking(
              channelId,
              note,
              queuedTime + player.startDelay,
              offset - foffset,
              144,
              event.velocity
            ),
          });
          messages++;
          break;
        case 'noteOff':
          if (channel.mute) break;
          note = event.noteNumber - (player.MIDIOffset || 0);
          eventQueue.push({
            event,
            time: queueTime,
            source: root.noteOff(channelId, event.noteNumber, delay),
            interval: scheduleTracking(
              channelId,
              note,
              queuedTime,
              offset - foffset,
              128,
              0
            ),
          });
          break;
        default:
          break;
      }
    }
    // /
    onsuccess && onsuccess(eventQueue);
  };

  var stopAudio = function () {
    const ctx = getContext();
    player.playing = false;
    player.restart += (ctx.currentTime - startTime) * 1000;
    // stop the audio, and intervals
    while (eventQueue.length) {
      const o = eventQueue.pop();
      window.clearInterval(o.interval);
      if (!o.source) continue; // is not webaudio
      if (typeof o.source === 'number') {
        window.clearTimeout(o.source);
      } else {
        // webaudio
        o.source.disconnect(0);
      }
    }
    // run callback to cancel any notes still playing
    for (const key in noteRegistrar) {
      const o = noteRegistrar[key];
      if (noteRegistrar[key].message === 144 && onMidiEvent) {
        onMidiEvent({
          channel: o.channel,
          note: o.note,
          now: o.now,
          end: o.end,
          message: 128,
          velocity: o.velocity,
        });
      }
    }
    // reset noteRegistrar
    noteRegistrar = {};
  };
})();

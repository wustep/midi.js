(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MIDI", [], factory);
	else if(typeof exports === 'object')
		exports["MIDI"] = factory();
	else
		root["MIDI"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/gm.js":
/*!*******************!*\
  !*** ./src/gm.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./root */ "./src/root.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root__WEBPACK_IMPORTED_MODULE_0__);
/*
 * ----------------------------------------------------------
 * GeneralMIDI
 * ----------------------------------------------------------
 */


_root__WEBPACK_IMPORTED_MODULE_0___default.a.GM = function (map) {
  var clean = function clean(name) {
    return name.replace(/[^a-z0-9 ]/gi, '').replace(/[ ]/g, '_').toLowerCase();
  };

  var res = {
    byName: {},
    byId: {},
    byCategory: {}
  };

  for (var key in map) {
    var list = map[key];

    for (var n = 0, length = list.length; n < length; n++) {
      var instrument = list[n];
      if (!instrument) continue;
      var num = parseInt(instrument.substr(0, instrument.indexOf(' ')), 10);
      instrument = instrument.replace("".concat(num, " "), '');
      res.byId[--num] = res.byName[clean(instrument)] = res.byCategory[clean(key)] = {
        id: clean(instrument),
        instrument: instrument,
        number: num,
        category: key
      };
    }
  }

  return res;
}({
  Piano: ['1 Acoustic Grand Piano', '2 Bright Acoustic Piano', '3 Electric Grand Piano', '4 Honky-tonk Piano', '5 Electric Piano 1', '6 Electric Piano 2', '7 Harpsichord', '8 Clavinet'],
  'Chromatic Percussion': ['9 Celesta', '10 Glockenspiel', '11 Music Box', '12 Vibraphone', '13 Marimba', '14 Xylophone', '15 Tubular Bells', '16 Dulcimer'],
  Organ: ['17 Drawbar Organ', '18 Percussive Organ', '19 Rock Organ', '20 Church Organ', '21 Reed Organ', '22 Accordion', '23 Harmonica', '24 Tango Accordion'],
  Guitar: ['25 Acoustic Guitar (nylon)', '26 Acoustic Guitar (steel)', '27 Electric Guitar (jazz)', '28 Electric Guitar (clean)', '29 Electric Guitar (muted)', '30 Overdriven Guitar', '31 Distortion Guitar', '32 Guitar Harmonics'],
  Bass: ['33 Acoustic Bass', '34 Electric Bass (finger)', '35 Electric Bass (pick)', '36 Fretless Bass', '37 Slap Bass 1', '38 Slap Bass 2', '39 Synth Bass 1', '40 Synth Bass 2'],
  Strings: ['41 Violin', '42 Viola', '43 Cello', '44 Contrabass', '45 Tremolo Strings', '46 Pizzicato Strings', '47 Orchestral Harp', '48 Timpani'],
  Ensemble: ['49 String Ensemble 1', '50 String Ensemble 2', '51 Synth Strings 1', '52 Synth Strings 2', '53 Choir Aahs', '54 Voice Oohs', '55 Synth Choir', '56 Orchestra Hit'],
  Brass: ['57 Trumpet', '58 Trombone', '59 Tuba', '60 Muted Trumpet', '61 French Horn', '62 Brass Section', '63 Synth Brass 1', '64 Synth Brass 2'],
  Reed: ['65 Soprano Sax', '66 Alto Sax', '67 Tenor Sax', '68 Baritone Sax', '69 Oboe', '70 English Horn', '71 Bassoon', '72 Clarinet'],
  Pipe: ['73 Piccolo', '74 Flute', '75 Recorder', '76 Pan Flute', '77 Blown Bottle', '78 Shakuhachi', '79 Whistle', '80 Ocarina'],
  'Synth Lead': ['81 Lead 1 (square)', '82 Lead 2 (sawtooth)', '83 Lead 3 (calliope)', '84 Lead 4 (chiff)', '85 Lead 5 (charang)', '86 Lead 6 (voice)', '87 Lead 7 (fifths)', '88 Lead 8 (bass + lead)'],
  'Synth Pad': ['89 Pad 1 (new age)', '90 Pad 2 (warm)', '91 Pad 3 (polysynth)', '92 Pad 4 (choir)', '93 Pad 5 (bowed)', '94 Pad 6 (metallic)', '95 Pad 7 (halo)', '96 Pad 8 (sweep)'],
  'Synth Effects': ['97 FX 1 (rain)', '98 FX 2 (soundtrack)', '99 FX 3 (crystal)', '100 FX 4 (atmosphere)', '101 FX 5 (brightness)', '102 FX 6 (goblins)', '103 FX 7 (echoes)', '104 FX 8 (sci-fi)'],
  Ethnic: ['105 Sitar', '106 Banjo', '107 Shamisen', '108 Koto', '109 Kalimba', '110 Bagpipe', '111 Fiddle', '112 Shanai'],
  Percussive: ['113 Tinkle Bell', '114 Agogo', '115 Steel Drums', '116 Woodblock', '117 Taiko Drum', '118 Melodic Tom', '119 Synth Drum'],
  'Sound effects': ['120 Reverse Cymbal', '121 Guitar Fret Noise', '122 Breath Noise', '123 Seashore', '124 Bird Tweet', '125 Telephone Ring', '126 Helicopter', '127 Applause', '128 Gunshot']
});
/*
 * get/setInstrument
 * ---------------------------------------------------
 */


_root__WEBPACK_IMPORTED_MODULE_0___default.a.getInstrument = function (channelId) {
  var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];
  return channel && channel.instrument;
};

_root__WEBPACK_IMPORTED_MODULE_0___default.a.setInstrument = function (channelId, program, delay) {
  var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];

  if (delay) {
    return setTimeout(function () {
      channel.instrument = program;
    }, delay);
  }

  channel.instrument = program;
};
/*
 * get/setMono
 * ---------------------------------------------------
 */


_root__WEBPACK_IMPORTED_MODULE_0___default.a.getMono = function (channelId) {
  var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];
  return channel && channel.mono;
};

_root__WEBPACK_IMPORTED_MODULE_0___default.a.setMono = function (channelId, truthy, delay) {
  var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];

  if (delay) {
    return setTimeout(function () {
      channel.mono = truthy;
    }, delay);
  }

  channel.mono = truthy;
};
/*
 * get/setOmni
 * ---------------------------------------------------
 */


_root__WEBPACK_IMPORTED_MODULE_0___default.a.getOmni = function (channelId) {
  var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];
  return channel && channel.omni;
};

_root__WEBPACK_IMPORTED_MODULE_0___default.a.setOmni = function (channelId, truthy, delay) {
  var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];

  if (delay) {
    return setTimeout(function () {
      channel.omni = truthy;
    }, delay);
  }

  channel.omni = truthy;
};
/*
 * get/setSolo
 * ---------------------------------------------------
 */


_root__WEBPACK_IMPORTED_MODULE_0___default.a.getSolo = function (channelId) {
  var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];
  return channel && channel.solo;
};

_root__WEBPACK_IMPORTED_MODULE_0___default.a.setSolo = function (channelId, truthy, delay) {
  var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];

  if (delay) {
    return setTimeout(function () {
      channel.solo = truthy;
    }, delay);
  }

  channel.solo = truthy;
};
/*
 * channels
 * ---------------------------------------------------
 */


_root__WEBPACK_IMPORTED_MODULE_0___default.a.channels = function () {
  // 0 - 15 channels
  var channels = {};

  for (var i = 0; i < 16; i++) {
    channels[i] = {
      // default values
      instrument: i,
      pitchBend: 0,
      mute: false,
      mono: false,
      omni: false,
      solo: false
    };
  }

  return channels;
}();
/*
 * note conversions
 * ---------------------------------------------------
 */


_root__WEBPACK_IMPORTED_MODULE_0___default.a.keyToNote = {}; // C8  == 108

_root__WEBPACK_IMPORTED_MODULE_0___default.a.noteToKey = {}; // 108 ==  C8

~function () {
  var A0 = 0x15; // first note

  var C8 = 0x6c; // last note

  var number2key = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  for (var n = A0; n <= C8; n++) {
    var octave = (n - 12) / 12 >> 0;
    var name = number2key[n % 12] + octave;
    _root__WEBPACK_IMPORTED_MODULE_0___default.a.keyToNote[name] = n;
    _root__WEBPACK_IMPORTED_MODULE_0___default.a.noteToKey[n] = name;
  }
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./root */ "./src/root.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader */ "./src/loader.js");
/* harmony import */ var _gm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gm */ "./src/gm.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plugins */ "./src/plugins/index.js");





window.MIDI = _root__WEBPACK_IMPORTED_MODULE_0___default.a;
/* harmony default export */ __webpack_exports__["default"] = (_root__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "./src/jasmid/_stream.js":
/*!*******************************!*\
  !*** ./src/jasmid/_stream.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* Wrapper for accessing strings through sequential reads */
/* harmony default export */ __webpack_exports__["default"] = (function (str) {
  var position = 0;

  function read(length) {
    var result = str.substr(position, length);
    position += length;
    return result;
  }
  /* read a big-endian 32-bit integer */


  function readInt32() {
    var result = (str.charCodeAt(position) << 24) + (str.charCodeAt(position + 1) << 16) + (str.charCodeAt(position + 2) << 8) + str.charCodeAt(position + 3);
    position += 4;
    return result;
  }
  /* read a big-endian 16-bit integer */


  function readInt16() {
    var result = (str.charCodeAt(position) << 8) + str.charCodeAt(position + 1);
    position += 2;
    return result;
  }
  /* read an 8-bit integer */


  function readInt8(signed) {
    var result = str.charCodeAt(position);
    if (signed && result > 127) result -= 256;
    position += 1;
    return result;
  }

  function eof() {
    return position >= str.length;
  }
  /*
   * read a MIDI-style variable-length integer
   * (big-endian value in groups of 7 bits,
   * with top bit set to signify that another byte follows)
   */


  function readVarInt() {
    var result = 0;

    while (true) {
      var b = readInt8();

      if (b & 0x80) {
        result += b & 0x7f;
        result <<= 7;
      } else {
        /* b is the last byte */
        return result + b;
      }
    }
  }

  return {
    eof: eof,
    read: read,
    readInt32: readInt32,
    readInt16: readInt16,
    readInt8: readInt8,
    readVarInt: readVarInt
  };
});

/***/ }),

/***/ "./src/jasmid/index.js":
/*!*****************************!*\
  !*** ./src/jasmid/index.js ***!
  \*****************************/
/*! exports provided: MidiFile, Replayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _midifile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./midifile */ "./src/jasmid/midifile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MidiFile", function() { return _midifile__WEBPACK_IMPORTED_MODULE_0__["MidiFile"]; });

/* harmony import */ var _replayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replayer */ "./src/jasmid/replayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Replayer", function() { return _replayer__WEBPACK_IMPORTED_MODULE_1__["Replayer"]; });




/***/ }),

/***/ "./src/jasmid/midifile.js":
/*!********************************!*\
  !*** ./src/jasmid/midifile.js ***!
  \********************************/
/*! exports provided: MidiFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MidiFile", function() { return MidiFile; });
/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_stream */ "./src/jasmid/_stream.js");
/**
 * class to parse the .mid file format
 * (depends on _stream.js)
 */

function MidiFile(data) {
  var lastEventTypeByte;

  function readChunk(stream) {
    var id = stream.read(4);
    var length = stream.readInt32();
    return {
      id: id,
      length: length,
      data: stream.read(length)
    };
  }

  function readEvent(stream) {
    var event = {};
    event.deltaTime = stream.readVarInt();
    var eventTypeByte = stream.readInt8();

    if ((eventTypeByte & 0xf0) === 0xf0) {
      /* system / meta event */
      if (eventTypeByte === 0xff) {
        /* meta event */
        event.type = 'meta';
        var subtypeByte = stream.readInt8();
        var length = stream.readVarInt();

        switch (subtypeByte) {
          case 0x00:
            event.subtype = 'sequenceNumber';
            if (length !== 2) throw new Error("Expected length for sequenceNumber event is 2, got ".concat(length));
            event.number = stream.readInt16();
            return event;

          case 0x01:
            event.subtype = 'text';
            event.text = stream.read(length);
            return event;

          case 0x02:
            event.subtype = 'copyrightNotice';
            event.text = stream.read(length);
            return event;

          case 0x03:
            event.subtype = 'trackName';
            event.text = stream.read(length);
            return event;

          case 0x04:
            event.subtype = 'instrumentName';
            event.text = stream.read(length);
            return event;

          case 0x05:
            event.subtype = 'lyrics';
            event.text = stream.read(length);
            return event;

          case 0x06:
            event.subtype = 'marker';
            event.text = stream.read(length);
            return event;

          case 0x07:
            event.subtype = 'cuePoint';
            event.text = stream.read(length);
            return event;

          case 0x20:
            event.subtype = 'midiChannelPrefix';
            if (length !== 1) throw new Error("Expected length for midiChannelPrefix event is 1, got ".concat(length));
            event.channel = stream.readInt8();
            return event;

          case 0x2f:
            event.subtype = 'endOfTrack';
            if (length !== 0) throw new Error("Expected length for endOfTrack event is 0, got ".concat(length));
            return event;

          case 0x51:
            event.subtype = 'setTempo';
            if (length !== 3) throw new Error("Expected length for setTempo event is 3, got ".concat(length));
            event.microsecondsPerBeat = (stream.readInt8() << 16) + (stream.readInt8() << 8) + stream.readInt8();
            return event;

          case 0x54:
            event.subtype = 'smpteOffset';
            if (length !== 5) throw new Error("Expected length for smpteOffset event is 5, got ".concat(length));
            var hourByte = stream.readInt8();
            event.frameRate = {
              0x00: 24,
              0x20: 25,
              0x40: 29,
              0x60: 30
            }[hourByte & 0x60];
            event.hour = hourByte & 0x1f;
            event.min = stream.readInt8();
            event.sec = stream.readInt8();
            event.frame = stream.readInt8();
            event.subframe = stream.readInt8();
            return event;

          case 0x58:
            event.subtype = 'timeSignature';
            if (length !== 4) throw new Error("Expected length for timeSignature event is 4, got ".concat(length));
            event.numerator = stream.readInt8();
            event.denominator = Math.pow(2, stream.readInt8());
            event.metronome = stream.readInt8();
            event.thirtyseconds = stream.readInt8();
            return event;

          case 0x59:
            event.subtype = 'keySignature';
            if (length !== 2) throw new Error("Expected length for keySignature event is 2, got ".concat(length));
            event.key = stream.readInt8(true);
            event.scale = stream.readInt8();
            return event;

          case 0x7f:
            event.subtype = 'sequencerSpecific';
            event.data = stream.read(length);
            return event;

          default:
            // console.log("Unrecognised meta event subtype: " + subtypeByte)
            event.subtype = 'unknown';
            event.data = stream.read(length);
            return event;
        }
        /*
         * event.data = stream.read(length)
         * return event
         */

      } else if (eventTypeByte === 0xf0) {
        event.type = 'sysEx';

        var _length = stream.readVarInt();

        event.data = stream.read(_length);
        return event;
      } else if (eventTypeByte === 0xf7) {
        event.type = 'dividedSysEx';

        var _length2 = stream.readVarInt();

        event.data = stream.read(_length2);
        return event;
      } else {
        throw new Error("Unrecognised MIDI event type byte: ".concat(eventTypeByte));
      }
    } else {
      /* channel event */
      var param1;

      if ((eventTypeByte & 0x80) === 0) {
        /*
         * running status - reuse lastEventTypeByte as the event type.
         * eventTypeByte is actually the first parameter
         */
        param1 = eventTypeByte;
        eventTypeByte = lastEventTypeByte;
      } else {
        param1 = stream.readInt8();
        lastEventTypeByte = eventTypeByte;
      }

      var eventType = eventTypeByte >> 4;
      event.channel = eventTypeByte & 0x0f;
      event.type = 'channel';

      switch (eventType) {
        case 0x08:
          event.subtype = 'noteOff';
          event.noteNumber = param1;
          event.velocity = stream.readInt8();
          return event;

        case 0x09:
          event.noteNumber = param1;
          event.velocity = stream.readInt8();

          if (event.velocity === 0) {
            event.subtype = 'noteOff';
          } else {
            event.subtype = 'noteOn';
          }

          return event;

        case 0x0a:
          event.subtype = 'noteAftertouch';
          event.noteNumber = param1;
          event.amount = stream.readInt8();
          return event;

        case 0x0b:
          event.subtype = 'controller';
          event.controllerType = param1;
          event.value = stream.readInt8();
          return event;

        case 0x0c:
          event.subtype = 'programChange';
          event.programNumber = param1;
          return event;

        case 0x0d:
          event.subtype = 'channelAftertouch';
          event.amount = param1;
          return event;

        case 0x0e:
          event.subtype = 'pitchBend';
          event.value = param1 + (stream.readInt8() << 7);
          return event;

        default:
          throw new Error("Unrecognised MIDI event type: ".concat(eventType));

        /*
         *console.log("Unrecognised MIDI event type: " + eventType)
         *stream.readInt8()
         *event.subtype = 'unknown'
         *return event
         */
      }
    }
  }

  var stream = Object(_stream__WEBPACK_IMPORTED_MODULE_0__["default"])(data);
  var headerChunk = readChunk(stream);

  if (headerChunk.id !== 'MThd' || headerChunk.length !== 6) {
    throw new Error('Bad .mid file - header not found');
  }

  var headerStream = Object(_stream__WEBPACK_IMPORTED_MODULE_0__["default"])(headerChunk.data);
  var formatType = headerStream.readInt16();
  var trackCount = headerStream.readInt16();
  var timeDivision = headerStream.readInt16();
  var ticksPerBeat;

  if (timeDivision & 0x8000) {
    throw new Error('Expressing time division in SMTPE frames is not supported yet');
  } else {
    ticksPerBeat = timeDivision;
  }

  var header = {
    formatType: formatType,
    trackCount: trackCount,
    ticksPerBeat: ticksPerBeat
  };
  var tracks = [];

  for (var i = 0; i < header.trackCount; i++) {
    tracks[i] = [];
    var trackChunk = readChunk(stream);

    if (trackChunk.id !== 'MTrk') {
      throw new Error("Unexpected chunk - expected MTrk, got ".concat(trackChunk.id));
    }

    var trackStream = Object(_stream__WEBPACK_IMPORTED_MODULE_0__["default"])(trackChunk.data);

    while (!trackStream.eof()) {
      var event = readEvent(trackStream);
      tracks[i].push(event); // console.log(event)
    }
  }

  return {
    header: header,
    tracks: tracks
  };
}

/***/ }),

/***/ "./src/jasmid/replayer.js":
/*!********************************!*\
  !*** ./src/jasmid/replayer.js ***!
  \********************************/
/*! exports provided: Replayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Replayer", function() { return Replayer; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var clone = function clone(o) {
  if (_typeof(o) !== 'object') return o;
  if (o === null) return o;
  var ret = typeof o.length === 'number' ? [] : {};

  for (var key in o) {
    ret[key] = clone(o[key]);
  }

  return ret;
};

function Replayer(midiFile, timeWarp, eventProcessor, bpm) {
  var trackStates = [];
  var beatsPerMinute = bpm || 120;
  var bpmOverride = !!bpm;
  var ticksPerBeat = midiFile.header.ticksPerBeat;

  for (var i = 0; i < midiFile.tracks.length; i++) {
    trackStates[i] = {
      nextEventIndex: 0,
      ticksToNextEvent: midiFile.tracks[i].length ? midiFile.tracks[i][0].deltaTime : null
    };
  }

  function getNextEvent() {
    var ticksToNextEvent = null;
    var nextEventTrack = null;
    var nextEventIndex = null;

    for (var _i = 0; _i < trackStates.length; _i++) {
      if (trackStates[_i].ticksToNextEvent != null && (ticksToNextEvent == null || trackStates[_i].ticksToNextEvent < ticksToNextEvent)) {
        ticksToNextEvent = trackStates[_i].ticksToNextEvent;
        nextEventTrack = _i;
        nextEventIndex = trackStates[_i].nextEventIndex;
      }
    }

    if (nextEventTrack != null) {
      /* consume event from that track */
      var nextEvent = midiFile.tracks[nextEventTrack][nextEventIndex];

      if (midiFile.tracks[nextEventTrack][nextEventIndex + 1]) {
        trackStates[nextEventTrack].ticksToNextEvent += midiFile.tracks[nextEventTrack][nextEventIndex + 1].deltaTime;
      } else {
        trackStates[nextEventTrack].ticksToNextEvent = null;
      }

      trackStates[nextEventTrack].nextEventIndex += 1;
      /* advance timings on all tracks by ticksToNextEvent */

      for (var _i2 = 0; _i2 < trackStates.length; _i2++) {
        if (trackStates[_i2].ticksToNextEvent != null) {
          trackStates[_i2].ticksToNextEvent -= ticksToNextEvent;
        }
      }

      return {
        ticksToEvent: ticksToNextEvent,
        event: nextEvent,
        track: nextEventTrack
      };
    }

    return null;
  } //


  var midiEvent;
  var temporal = [];
  ~function processEvents() {
    function processNext() {
      if (!bpmOverride && midiEvent.event.type === 'meta' && midiEvent.event.subtype === 'setTempo') {
        // tempo change events can occur anywhere in the middle and affect events that follow
        beatsPerMinute = 60000000 / midiEvent.event.microsecondsPerBeat;
      } // /


      var beatsToGenerate = 0;
      var secondsToGenerate = 0;

      if (midiEvent.ticksToEvent > 0) {
        beatsToGenerate = midiEvent.ticksToEvent / ticksPerBeat;
        secondsToGenerate = beatsToGenerate / (beatsPerMinute / 60);
      } // /


      var time = secondsToGenerate * 1000 * timeWarp || 0;
      temporal.push([midiEvent, time]);
      midiEvent = getNextEvent();
    } // /


    midiEvent = getNextEvent();

    if (midiEvent) {
      while (midiEvent) {
        processNext(true);
      }
    }
  }();
  return {
    getData: function getData() {
      return clone(temporal);
    }
  };
}

/***/ }),

/***/ "./src/loader.js":
/*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./root */ "./src/root.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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


_root__WEBPACK_IMPORTED_MODULE_0___default.a.loadScript = _utils__WEBPACK_IMPORTED_MODULE_1__["loadScript"];
_root__WEBPACK_IMPORTED_MODULE_0___default.a.Soundfont = {};
_root__WEBPACK_IMPORTED_MODULE_0___default.a.DEBUG = true;
_root__WEBPACK_IMPORTED_MODULE_0___default.a.USE_XHR = true;
_root__WEBPACK_IMPORTED_MODULE_0___default.a.soundfontUrl = './soundfont/';
/*
 * root.loadPlugin({
 *   onsuccess: function() { },
 *   onprogress: function(state, percent) { },
 *   targetFormat: 'mp3', // optionally can force to use MP3 (for instance on mobile networks)
 *   instrument: 'acoustic_grand_piano', // or 1 (default)
 *   instruments: [ 'acoustic_grand_piano', 'acoustic_guitar_nylon' ] // or multiple instruments
 * })
 */

_root__WEBPACK_IMPORTED_MODULE_0___default.a.loadPlugin = function (opts) {
  if (typeof opts === 'function') {
    opts = {
      onsuccess: opts
    };
  }

  _root__WEBPACK_IMPORTED_MODULE_0___default.a.soundfontUrl = opts.soundfontUrl || _root__WEBPACK_IMPORTED_MODULE_0___default.a.soundfontUrl; // / Detect the best type of audio to use

  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["audioDetect"])(function (supports) {
    var hash = window.location.hash;
    var api = ''; // / use the most appropriate plugin if not specified

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
      var audioFormat;

      if (opts.targetFormat) {
        audioFormat = opts.targetFormat;
      } else {
        // use best quality
        audioFormat = supports['audio/ogg'] ? 'ogg' : 'mp3';
      } // / load the specified plugin


      _root__WEBPACK_IMPORTED_MODULE_0___default.a.__api = api;
      _root__WEBPACK_IMPORTED_MODULE_0___default.a.__audioFormat = audioFormat;
      _root__WEBPACK_IMPORTED_MODULE_0___default.a.supports = supports;
      _root__WEBPACK_IMPORTED_MODULE_0___default.a.loadResource(opts);
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


_root__WEBPACK_IMPORTED_MODULE_0___default.a.loadResource = function (opts) {
  var instruments = opts.instruments || opts.instrument || 'acoustic_grand_piano'; // /

  if (_typeof(instruments) !== 'object') {
    if (instruments || instruments === 0) {
      instruments = [instruments];
    } else {
      instruments = [];
    }
  } // / convert numeric ids into strings


  for (var i = 0; i < instruments.length; i++) {
    var instrument = instruments[i];

    if (instrument === +instrument) {
      // is numeric
      if (_root__WEBPACK_IMPORTED_MODULE_0___default.a.GM.byId[instrument]) {
        instruments[i] = _root__WEBPACK_IMPORTED_MODULE_0___default.a.GM.byId[instrument].id;
      }
    }
  } // /


  opts.format = _root__WEBPACK_IMPORTED_MODULE_0___default.a.__audioFormat;
  opts.instruments = instruments; // /

  connect[_root__WEBPACK_IMPORTED_MODULE_0___default.a.__api](opts);
};

var connect = {
  webmidi: function webmidi(opts) {
    // cant wait for this to be standardized!
    _root__WEBPACK_IMPORTED_MODULE_0___default.a.WebMIDI.connect(opts);
  },
  audiotag: function audiotag(opts) {
    /*
     * works ok, kinda like a drunken tuna fish, across the board
     * http://caniuse.com/audio
     */
    requestQueue(opts, 'AudioTag');
  },
  webaudio: function webaudio(opts) {
    /*
     * works awesome! safari, chrome and firefox support
     * http://caniuse.com/web-audio
     */
    requestQueue(opts, 'WebAudio');
  }
};

var requestQueue = function requestQueue(opts, context) {
  var audioFormat = opts.format;
  var instruments = opts.instruments;
  var onprogress = opts.onprogress;
  var onerror = opts.onerror; // /

  var length = instruments.length;
  var pending = length;

  var waitForEnd = function waitForEnd() {
    if (! --pending) {
      onprogress && onprogress('load', 1.0);
      _root__WEBPACK_IMPORTED_MODULE_0___default.a[context].connect(opts);
    }
  }; // /


  for (var i = 0; i < length; i++) {
    var instrumentId = instruments[i];

    if (_root__WEBPACK_IMPORTED_MODULE_0___default.a.Soundfont[instrumentId]) {
      // already loaded
      waitForEnd();
    } else {
      // needs to be requested
      sendRequest(instruments[i], audioFormat, function (evt, progress) {
        var fileProgress = progress / length;
        var queueProgress = (length - pending) / length;
        onprogress && onprogress('load', fileProgress + queueProgress, instrumentId);
      }, function () {
        waitForEnd();
      }, onerror);
    }
  }
};

var sendRequest = function sendRequest(instrumentId, audioFormat, onprogress, _onsuccess, onerror) {
  var soundfontPath = "".concat(_root__WEBPACK_IMPORTED_MODULE_0___default.a.soundfontUrl + instrumentId, "-").concat(audioFormat, ".js");

  if (_root__WEBPACK_IMPORTED_MODULE_0___default.a.USE_XHR) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["request"])({
      url: soundfontPath,
      format: 'text',
      onerror: onerror,
      onprogress: onprogress,
      onsuccess: function onsuccess(event, responseText) {
        var script = document.createElement('script');
        script.language = 'javascript';
        script.type = 'text/javascript';
        script.text = responseText;
        document.body.appendChild(script);

        _onsuccess();
      }
    });
  } else {
    _utils__WEBPACK_IMPORTED_MODULE_1__["loadScript"].add({
      url: soundfontPath,
      verify: "root.Soundfont[\"".concat(instrumentId, "\"]"),
      onerror: onerror,
      onsuccess: function onsuccess() {
        _onsuccess();
      }
    });
  }
};

_root__WEBPACK_IMPORTED_MODULE_0___default.a.setDefaultPlugin = function (midi) {
  for (var key in midi) {
    _root__WEBPACK_IMPORTED_MODULE_0___default.a[key] = midi[key];
  }
};

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jasmid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jasmid */ "./src/jasmid/index.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./root */ "./src/root.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_root__WEBPACK_IMPORTED_MODULE_1__);
/*
 *----------------------------------------------------------
 *midi.Player : 0.3.1 : 2015-03-26
 *----------------------------------------------------------
 *https://github.com/mudcube/midi.js
 *----------------------------------------------------------
 */



(function () {
  _root__WEBPACK_IMPORTED_MODULE_1___default.a.Player = {};
  var player = _root__WEBPACK_IMPORTED_MODULE_1___default.a.Player;
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
    var tmp = player.restart;
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
    var currentTime = 0;
    var tOurTime = 0;
    var tTheirTime = 0; //

    player.clearAnimation(); // /

    var frame = function frame() {
      player.animationFrameId = window.requestAnimationFrame(frame); // /

      if (player.endTime === 0) {
        return;
      }

      if (player.playing) {
        currentTime = tTheirTime === player.currentTime ? tOurTime - Date.now() : 0;

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
      } // /


      var endTime = player.endTime; // var percent = currentTime / endTime

      var total = currentTime / 1000;
      var minutes = total / 60;
      var seconds = total - minutes * 60;
      var t1 = minutes * 60 + seconds;
      var t2 = endTime / 1000; // /

      if (t2 - t1 < -1.0) {} else {
        callback({
          now: t1,
          end: t2,
          events: noteRegistrar
        });
      }
    }; // /


    window.requestAnimationFrame(frame);
  }; // helpers


  player.loadMidiFile = function (onsuccess, onprogress, onerror) {
    try {
      // console.log(MidiFile(player.currentData), new Replayer(MidiFile(player.currentData), player.timeWarp, null, player.BPM))
      player.replayer = new _jasmid__WEBPACK_IMPORTED_MODULE_0__["Replayer"](Object(_jasmid__WEBPACK_IMPORTED_MODULE_0__["MidiFile"])(player.currentData), player.timeWarp, null, player.BPM);
      player.data = player.replayer.getData();
      player.endTime = getLength(); // /

      _root__WEBPACK_IMPORTED_MODULE_1___default.a.loadPlugin({
        // instruments: player.getFileInstruments(),
        onsuccess: onsuccess,
        onprogress: onprogress,
        onerror: onerror
      });
    } catch (event) {
      console.error(event);
      onerror && onerror(event);
    }
  };

  player.loadFile = function (file, onsuccess, onprogress, onerror) {
    player.stop();

    if (file.indexOf('base64,') !== -1) {
      var data = window.atob(file.split(',')[1]);
      player.currentData = data;
      player.loadMidiFile(onsuccess, onprogress, onerror);
    } else {
      var fetch = new window.XMLHttpRequest();
      fetch.open('GET', file);
      fetch.overrideMimeType('text/plain; charset=x-user-defined');

      fetch.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            var t = this.responseText || '';
            var ff = [];
            var mx = t.length;
            var scc = String.fromCharCode;

            for (var z = 0; z < mx; z++) {
              ff[z] = scc(t.charCodeAt(z) & 255);
            } // /


            var _data = ff.join('');

            player.currentData = _data;
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
    var instruments = {};
    var programs = {};

    for (var n = 0; n < player.data.length; n++) {
      var event = player.data[n][0].event;

      if (event.type !== 'channel') {
        continue;
      }

      var channel = event.channel;

      switch (event.subtype) {
        case 'controller':
          //        console.log(event.channel, root.defineControl[event.controllerType], event.value)
          break;

        case 'programChange':
          programs[channel] = event.programNumber;
          break;

        case 'noteOn':
          var program = programs[channel];
          var gm = _root__WEBPACK_IMPORTED_MODULE_1___default.a.GM.byId[isFinite(program) ? program : channel];
          instruments[gm.id] = true;
          break;
      }
    }

    var ret = [];

    for (var key in instruments) {
      ret.push(key);
    }

    return ret;
  }; // Playing the audio


  var eventQueue = []; // hold events to be triggered

  var queuedTime; //

  var startTime = 0; // to measure time elapse

  var noteRegistrar = {}; // get event for requested note

  var onMidiEvent; // listener

  var scheduleTracking = function scheduleTracking(channel, note, currentTime, offset, message, velocity, time) {
    return setTimeout(function () {
      var data = {
        channel: channel,
        note: note,
        now: currentTime,
        end: player.endTime,
        message: message,
        velocity: velocity
      }; //

      if (message === 128) {
        delete noteRegistrar[note];
      } else {
        noteRegistrar[note] = data;
      }

      if (onMidiEvent) {
        onMidiEvent(data);
      }

      player.currentTime = currentTime; // /

      eventQueue.shift(); // /

      if (eventQueue.length < 1000) {
        startAudio(queuedTime, true);
      } else if (player.currentTime === queuedTime && queuedTime < player.endTime) {
        // grab next sequence
        startAudio(queuedTime, true);
      }
    }, currentTime - offset);
  };

  var getContext = function getContext() {
    if (_root__WEBPACK_IMPORTED_MODULE_1___default.a.api === 'webaudio') {
      return _root__WEBPACK_IMPORTED_MODULE_1___default.a.WebAudio.getContext();
    }

    player.ctx = {
      currentTime: 0
    };
    return player.ctx;
  };

  var getLength = function getLength() {
    var data = player.data;
    var length = data.length;
    var totalTime = 0.5;

    for (var n = 0; n < length; n++) {
      totalTime += data[n][1];
    }

    return totalTime;
  };

  var __now;

  var getNow = function getNow() {
    if (window.performance && window.performance.now) {
      return window.performance.now();
    }

    return Date.now();
  };

  var startAudio = function startAudio(currentTime, fromCache, onsuccess) {
    if (!player.replayer) {
      return;
    }

    if (!fromCache) {
      if (typeof currentTime === 'undefined') {
        currentTime = player.restart;
      } // /


      player.playing && stopAudio();
      player.playing = true;
      player.data = player.replayer.getData();
      player.endTime = getLength();
    } // /


    var note;
    var offset = 0;
    var messages = 0;
    var data = player.data;
    var ctx = getContext();
    var length = data.length; //

    queuedTime = 0.5; // /
    // var interval = eventQueue[0] && eventQueue[0].interval || 0

    var foffset = currentTime - player.currentTime; // /

    if (_root__WEBPACK_IMPORTED_MODULE_1___default.a.api !== 'webaudio') {
      // set currentTime on ctx
      var now = getNow();
      __now = __now || now;
      ctx.currentTime = (now - __now) / 1000;
    } // /


    startTime = ctx.currentTime; // /

    for (var n = 0; n < length && messages < 100; n++) {
      var obj = data[n];

      if ((queuedTime += obj[1]) <= currentTime) {
        offset = queuedTime;
        continue;
      } // /


      currentTime = queuedTime - offset; // /

      var event = obj[0].event;

      if (event.type !== 'channel') {
        continue;
      } // /


      var channelId = event.channel;
      var channel = _root__WEBPACK_IMPORTED_MODULE_1___default.a.channels[channelId];
      var delay = ctx.currentTime + (currentTime + foffset + player.startDelay) / 1000;
      var queueTime = queuedTime - offset + player.startDelay;

      switch (event.subtype) {
        case 'controller':
          _root__WEBPACK_IMPORTED_MODULE_1___default.a.setController(channelId, event.controllerType, event.value, delay);
          break;

        case 'programChange':
          _root__WEBPACK_IMPORTED_MODULE_1___default.a.programChange(channelId, event.programNumber, delay);
          break;

        case 'pitchBend':
          _root__WEBPACK_IMPORTED_MODULE_1___default.a.pitchBend(channelId, event.value, delay);
          break;

        case 'noteOn':
          if (channel.mute) break;
          note = event.noteNumber - (player.MIDIOffset || 0);
          eventQueue.push({
            event: event,
            time: queueTime,
            source: _root__WEBPACK_IMPORTED_MODULE_1___default.a.noteOn(channelId, event.noteNumber, event.velocity, delay),
            interval: scheduleTracking(channelId, note, queuedTime + player.startDelay, offset - foffset, 144, event.velocity)
          });
          messages++;
          break;

        case 'noteOff':
          if (channel.mute) break;
          note = event.noteNumber - (player.MIDIOffset || 0);
          eventQueue.push({
            event: event,
            time: queueTime,
            source: _root__WEBPACK_IMPORTED_MODULE_1___default.a.noteOff(channelId, event.noteNumber, delay),
            interval: scheduleTracking(channelId, note, queuedTime, offset - foffset, 128, 0)
          });
          break;

        default:
          break;
      }
    } // /


    onsuccess && onsuccess(eventQueue);
  };

  var stopAudio = function stopAudio() {
    var ctx = getContext();
    player.playing = false;
    player.restart += (ctx.currentTime - startTime) * 1000; // stop the audio, and intervals

    while (eventQueue.length) {
      var o = eventQueue.pop();
      window.clearInterval(o.interval);
      if (!o.source) continue; // is not webaudio

      if (typeof o.source === 'number') {
        window.clearTimeout(o.source);
      } else {
        // webaudio
        o.source.disconnect(0);
      }
    } // run callback to cancel any notes still playing


    for (var key in noteRegistrar) {
      var _o = noteRegistrar[key];

      if (noteRegistrar[key].message === 144 && onMidiEvent) {
        onMidiEvent({
          channel: _o.channel,
          note: _o.note,
          now: _o.now,
          end: _o.end,
          message: 128,
          velocity: _o.velocity
        });
      }
    } // reset noteRegistrar


    noteRegistrar = {};
  };
})();

/***/ }),

/***/ "./src/plugins/audiotag.js":
/*!*********************************!*\
  !*** ./src/plugins/audiotag.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../root */ "./src/root.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root__WEBPACK_IMPORTED_MODULE_0__);
/*
 * ----------------------------------------------------------------------
 * AudioTag <audio> - OGG or MPEG Soundbank
 * ----------------------------------------------------------------------
 * http://dev.w3.org/html5/spec/Overview.html#the-audio-element
 * ----------------------------------------------------------------------
 */

window.Audio && function () {
  var midi = _root__WEBPACK_IMPORTED_MODULE_0___default.a.AudioTag = {
    api: 'audiotag'
  };
  var noteToKey = {};
  var volume = 127; // floating point

  var bufferNid = -1; // current channel

  var audioBuffers = []; // the audio channels

  var notesOn = []; // instrumentId + noteId that is currently playing in each 'channel', for routing noteOff/chordOff calls

  var notes = {}; // the piano keys

  for (var nid = 0; nid < 12; nid++) {
    audioBuffers[nid] = new window.Audio();
  }

  var playChannel = function playChannel(channel, note) {
    if (!_root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channel]) return;
    var instrument = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channel].instrument;
    var instrumentId = _root__WEBPACK_IMPORTED_MODULE_0___default.a.GM.byId[instrument].id;
    note = notes[note];

    if (note) {
      var instrumentNoteId = "".concat(instrumentId).concat(note.id);

      var _nid = (bufferNid + 1) % audioBuffers.length;

      var audio = audioBuffers[_nid];
      notesOn[_nid] = instrumentNoteId;

      if (!_root__WEBPACK_IMPORTED_MODULE_0___default.a.Soundfont[instrumentId]) {
        if (_root__WEBPACK_IMPORTED_MODULE_0___default.a.DEBUG) {
          console.log('404', instrumentId);
        }

        return;
      }

      audio.src = _root__WEBPACK_IMPORTED_MODULE_0___default.a.Soundfont[instrumentId][note.id];
      audio.volume = volume / 127;
      audio.play();
      bufferNid = _nid;
    }
  };

  var stopChannel = function stopChannel(channel, note) {
    if (!_root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channel]) return;
    var instrument = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channel].instrument;
    var instrumentId = _root__WEBPACK_IMPORTED_MODULE_0___default.a.GM.byId[instrument].id;
    note = notes[note];

    if (note) {
      var instrumentNoteId = "".concat(instrumentId).concat(note.id);

      for (var i = 0, len = audioBuffers.length; i < len; i++) {
        var _nid2 = (i + bufferNid + 1) % len;

        var cId = notesOn[_nid2];

        if (cId && cId === instrumentNoteId) {
          audioBuffers[_nid2].pause();

          notesOn[_nid2] = null;
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
    _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channel].instrument = program;
  };

  midi.pitchBend = function (channel, program, delay) {};

  midi.noteOn = function (channel, note, velocity, delay) {
    var id = noteToKey[note];
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
    for (var idx = 0; idx < chord.length; idx++) {
      var n = chord[idx];
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
    for (var idx = 0; idx < chord.length; idx++) {
      var n = chord[idx];
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
    for (var _nid3 = 0, length = audioBuffers.length; _nid3 < length; _nid3++) {
      audioBuffers[_nid3].pause();
    }
  };

  midi.connect = function (opts) {
    _root__WEBPACK_IMPORTED_MODULE_0___default.a.setDefaultPlugin(midi); // /

    for (var key in _root__WEBPACK_IMPORTED_MODULE_0___default.a.keyToNote) {
      noteToKey[_root__WEBPACK_IMPORTED_MODULE_0___default.a.keyToNote[key]] = key;
      notes[key] = {
        id: key
      };
    } // /


    opts.onsuccess && opts.onsuccess();
  };
}();

/***/ }),

/***/ "./src/plugins/index.js":
/*!******************************!*\
  !*** ./src/plugins/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _audiotag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audiotag */ "./src/plugins/audiotag.js");
/* harmony import */ var _webaudio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webaudio */ "./src/plugins/webaudio.js");
/* harmony import */ var _webmidi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webmidi */ "./src/plugins/webmidi.js");




/***/ }),

/***/ "./src/plugins/webaudio.js":
/*!*********************************!*\
  !*** ./src/plugins/webaudio.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../root */ "./src/root.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root__WEBPACK_IMPORTED_MODULE_0__);
/*
 * ----------------------------------------------------------
 * Web Audio API - OGG or MPEG Soundbank
 * ----------------------------------------------------------
 * http://webaudio.github.io/web-audio-api/
 * ----------------------------------------------------------
 */
 // REF: http://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer

function base64ToArrayBuffer(base64) {
  var binaryString = window.atob(base64);
  var len = binaryString.length;
  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

window.AudioContext && function () {
  // var audioContext = null // new AudioContext()
  var useStreamingBuffer = false; // !!audioContext.createMediaElementSource

  var midi = _root__WEBPACK_IMPORTED_MODULE_0___default.a.WebAudio = {
    api: 'webaudio'
  };
  var ctx; // audio context

  var sources = {};
  var effects = {};
  var masterVolume = 127;
  var audioBuffers = {}; // /

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
    var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];
    channel.instrument = program; //      }
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
    var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];
    channel.pitchBend = program; //      }
  };

  midi.noteOn = function (channelId, noteId, velocity, delay) {
    delay = delay || 0; // / check whether the note exists

    var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];
    var instrument = channel.instrument;
    var bufferId = "".concat(instrument).concat(noteId);
    var buffer = audioBuffers[bufferId];

    if (!buffer) {
      //        console.log(midi.GM.byId[instrument].id, instrument, channelId)
      return;
    } // / convert relative delay to absolute delay


    if (delay < ctx.currentTime) {
      delay += ctx.currentTime;
    } // / create audio buffer


    var source;

    if (useStreamingBuffer) {
      source = ctx.createMediaElementSource(buffer);
    } else {
      // XMLHTTP buffer
      source = ctx.createBufferSource();
      source.buffer = buffer;
    } // / add effects to buffer


    if (effects) {
      var chain = source;

      for (var key in effects) {
        chain.connect(effects[key].input);
        chain = effects[key];
      }
    } // / add gain + pitchShift


    var gain = velocity / 127 * (masterVolume / 127) * 2 - 1;
    source.connect(ctx.destination);
    source.playbackRate.value = 1; // pitch shift

    source.gainNode = ctx.createGain(); // gain

    source.gainNode.connect(ctx.destination);
    source.gainNode.gain.value = Math.min(1.0, Math.max(-1.0, gain));
    source.connect(source.gainNode); // /

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
    } // /


    sources["".concat(channelId).concat(noteId)] = source; // /

    return source;
  };

  midi.noteOff = function (channelId, noteId, delay) {
    delay = delay || 0; // / check whether the note exists

    var channel = _root__WEBPACK_IMPORTED_MODULE_0___default.a.channels[channelId];
    var instrument = channel.instrument;
    var bufferId = "".concat(instrument).concat(noteId);
    var buffer = audioBuffers[bufferId];

    if (buffer) {
      if (delay < ctx.currentTime) {
        delay += ctx.currentTime;
      } // /


      var source = sources["".concat(channelId).concat(noteId)];

      if (source) {
        if (source.gainNode) {
          /*
           * @Miranet: 'the values of 0.2 and 0.3 could of course be used as
           * a 'release' parameter for ADSR like time settings.'
           * add { 'metadata': { release: 0.3 } } to soundfont files
           */
          var gain = source.gainNode.gain;
          gain.linearRampToValueAtTime(gain.value, delay);
          gain.linearRampToValueAtTime(-1.0, delay + 0.3);
        } // /


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
        } // /


        delete sources["".concat(channelId).concat(noteId)]; // /

        return source;
      }
    }
  };

  midi.chordOn = function (channel, chord, velocity, delay) {
    var res = {};

    for (var n = 0, note, len = chord.length; n < len; n++) {
      res[note = chord[n]] = midi.noteOn(channel, note, velocity, delay);
    }

    return res;
  };

  midi.chordOff = function (channel, chord, delay) {
    var res = {};

    for (var n = 0, note, len = chord.length; n < len; n++) {
      res[note = chord[n]] = midi.noteOff(channel, note, delay);
    }

    return res;
  };

  midi.stopAllNotes = function () {
    for (var sid in sources) {
      var delay = 0;

      if (delay < ctx.currentTime) {
        delay += ctx.currentTime;
      }

      var source = sources[sid];
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
      for (var n = 0; n < list.length; n++) {
        var data = list[n];
        var effect = new ctx.tunajs[data.type](data);
        effect.connect(ctx.destination);
        effects[data.type] = effect;
      }
    } else {
      return console.log('Effects module not installed.');
    }
  };

  midi.connect = function (opts) {
    _root__WEBPACK_IMPORTED_MODULE_0___default.a.setDefaultPlugin(midi);
    midi.setContext(ctx || createAudioContext(), opts.onsuccess);
  };

  midi.getContext = function () {
    return ctx;
  };

  midi.setContext = function (newCtx, onload, onprogress, onerror) {
    ctx = newCtx; // / tuna.js effects module - https://github.com/Dinahmoe/tuna

    if (typeof window.Tuna !== 'undefined' && !ctx.tunajs) {
      ctx.tunajs = new window.Tuna(ctx);
    } // / loading audio files


    var urls = [];
    var notes = _root__WEBPACK_IMPORTED_MODULE_0___default.a.keyToNote;

    for (var key in notes) {
      urls.push(key);
    } // /


    var waitForEnd = function waitForEnd(instrument) {
      for (var _key in bufferPending) {
        // has pending items
        if (bufferPending[_key]) return;
      } // /


      if (onload) {
        // run onload once
        onload();
        onload = null;
      }
    }; // /


    var requestAudio = function requestAudio(soundfont, instrumentId, index, key) {
      var url = soundfont[key];

      if (url) {
        bufferPending[instrumentId]++;
        loadAudio(url, function (buffer) {
          buffer.id = key;
          var noteId = _root__WEBPACK_IMPORTED_MODULE_0___default.a.keyToNote[key];
          audioBuffers["".concat(instrumentId).concat(noteId)] = buffer; // /

          if (--bufferPending[instrumentId] === 0) {
            /*
             * var percent = index / 87
             *              console.log(midi.GM.byId[instrumentId], 'processing: ', percent)
             */
            soundfont.isLoaded = true;
            waitForEnd(instrument);
          }
        }, function (err) {
          console.error(err);
        });
      }
    }; // /


    var bufferPending = {};

    for (var instrument in _root__WEBPACK_IMPORTED_MODULE_0___default.a.Soundfont) {
      var soundfont = _root__WEBPACK_IMPORTED_MODULE_0___default.a.Soundfont[instrument];

      if (soundfont.isLoaded) {
        continue;
      } // /


      var synth = _root__WEBPACK_IMPORTED_MODULE_0___default.a.GM.byName[instrument];
      var instrumentId = synth.number; // /

      bufferPending[instrumentId] = 0; // /

      for (var index = 0; index < urls.length; index++) {
        var _key2 = urls[index];
        requestAudio(soundfont, instrumentId, index, _key2);
      }
    } // /


    setTimeout(waitForEnd, 1);
  };
  /*
   * Load audio file: streaming | base64 | arraybuffer
   * ----------------------------------------------------------------------
   */


  function loadAudio(url, onload, onerror) {
    if (useStreamingBuffer) {
      var audio = new window.Audio();
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
      var base64 = url.split(',')[1];
      var buffer = base64ToArrayBuffer(base64);
      ctx.decodeAudioData(buffer, onload, onerror);
    } else {
      // XMLHTTP buffer
      var request = new window.XMLHttpRequest();
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
}();

/***/ }),

/***/ "./src/plugins/webmidi.js":
/*!********************************!*\
  !*** ./src/plugins/webmidi.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../root */ "./src/root.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_root__WEBPACK_IMPORTED_MODULE_0__);
/*
 * ----------------------------------------------------------------------
 * Web MIDI API - Native Soundbanks
 * ----------------------------------------------------------------------
 * http://webaudio.github.io/web-midi-api/
 * ----------------------------------------------------------------------
 */


(function () {
  var plugin = null;
  var output = null;
  var midi = _root__WEBPACK_IMPORTED_MODULE_0___default.a.WebMIDI = {
    api: 'webmidi'
  };

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
    for (var n = 0; n < chord.length; n++) {
      var note = chord[n];
      output.send([0x90 + channel, note, velocity], delay * 1000);
    }
  };

  midi.chordOff = function (channel, chord, delay) {
    for (var n = 0; n < chord.length; n++) {
      var note = chord[n];
      output.send([0x80 + channel, note, 0], delay * 1000);
    }
  };

  midi.stopAllNotes = function () {
    output.cancel();

    for (var channel = 0; channel < 16; channel++) {
      output.send([0xb0 + channel, 0x7b, 0]);
    }
  };

  midi.connect = function (opts) {
    _root__WEBPACK_IMPORTED_MODULE_0___default.a.setDefaultPlugin(midi);

    var errFunction = function errFunction(err) {
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

      _root__WEBPACK_IMPORTED_MODULE_0___default.a.loadPlugin(opts);
    }; // /


    navigator.requestMIDIAccess().then(function (access) {
      plugin = access;
      var pluginOutputs = plugin.outputs;

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

/***/ }),

/***/ "./src/root.js":
/*!*********************!*\
  !*** ./src/root.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),

/***/ "./src/utils/audio-detect.js":
/*!***********************************!*\
  !*** ./src/utils/audio-detect.js ***!
  \***********************************/
/*! exports provided: audioDetect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "audioDetect", function() { return audioDetect; });
/*
 *----------------------------------------------------------
 *midi.audioDetect : 0.3.2 : 2015-03-26
 *----------------------------------------------------------
 *https://github.com/mudcube/midi.js
 *----------------------------------------------------------
 *Probably, Maybe, No... Absolutely!
 *Test to see what types of <audio> MIME types are playable by the browser.
 *----------------------------------------------------------
 */
var supports = {}; // object of supported file types

var pending = 0; // pending file types to process

var canPlayThrough = function canPlayThrough(src) {
  // check whether format plays through
  pending++;
  var _document = document,
      body = _document.body;
  var audio = new window.Audio();
  var mime = src.split(';')[0];
  audio.id = 'audio';
  audio.setAttribute('preload', 'auto');
  audio.setAttribute('audiobuffer', true);
  audio.addEventListener('error', function () {
    body.removeChild(audio);
    supports[mime] = false;
    pending--;
  }, false);
  audio.addEventListener('canplaythrough', function () {
    body.removeChild(audio);
    supports[mime] = true;
    pending--;
  }, false);
  audio.src = "data:".concat(src);
  body.appendChild(audio);
};

var audioDetect = function audioDetect(onsuccess) {
  // / detect jazz-midi plugin
  if (navigator.requestMIDIAccess) {
    var isNative = Function.prototype.toString.call(navigator.requestMIDIAccess).indexOf('[native code]');

    if (isNative) {
      // has native midiapi support
      supports.webmidi = true;
    } else {
      // check for jazz plugin midiapi support
      for (var n = 0; navigator.plugins.length > n; n++) {
        var plugin = navigator.plugins[n];

        if (plugin.name.indexOf('Jazz-Plugin') >= 0) {
          supports.webmidi = true;
        }
      }
    }
  } // / check whether <audio> tag is supported


  if (typeof window.Audio === 'undefined') {
    return onsuccess({});
  }

  supports.audiotag = true; // / check for webaudio api support

  if (window.AudioContext || window.webkitAudioContext) {
    supports.webaudio = true;
  } // / check whether canPlayType is supported


  var audio = new window.Audio();

  if (typeof audio.canPlayType === 'undefined') {
    return onsuccess(supports);
  } // / see what we can learn from the browser


  var vorbis = audio.canPlayType('audio/ogg; codecs="vorbis"');
  vorbis = vorbis === 'probably' || vorbis === 'maybe';
  var mpeg = audio.canPlayType('audio/mpeg');
  mpeg = mpeg === 'probably' || mpeg === 'maybe'; // maybe nothing is supported

  if (!vorbis && !mpeg) {
    onsuccess(supports);
    return;
  } // / or maybe something is supported


  if (vorbis) canPlayThrough('audio/ogg;base64,T2dnUwACAAAAAAAAAADqnjMlAAAAAOyyzPIBHgF2b3JiaXMAAAAAAUAfAABAHwAAQB8AAEAfAACZAU9nZ1MAAAAAAAAAAAAA6p4zJQEAAAANJGeqCj3//////////5ADdm9yYmlzLQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMTAxMTAxIChTY2hhdWZlbnVnZ2V0KQAAAAABBXZvcmJpcw9CQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBACAAAAYRqF1TCqDEEPKQ4QUY9AzoxBDDEzGHGNONKQMMogzxZAyiFssLqgQBKEhKwKAKAAAwBjEGGIMOeekZFIi55iUTkoDnaPUUcoolRRLjBmlEluJMYLOUeooZZRCjKXFjFKJscRUAABAgAMAQICFUGjIigAgCgCAMAYphZRCjCnmFHOIMeUcgwwxxiBkzinoGJNOSuWck85JiRhjzjEHlXNOSuekctBJyaQTAAAQ4AAAEGAhFBqyIgCIEwAwSJKmWZomipamiaJniqrqiaKqWp5nmp5pqqpnmqpqqqrrmqrqypbnmaZnmqrqmaaqiqbquqaquq6nqrZsuqoum65q267s+rZru77uqapsm6or66bqyrrqyrbuurbtS56nqqKquq5nqq6ruq5uq65r25pqyq6purJtuq4tu7Js664s67pmqq5suqotm64s667s2rYqy7ovuq5uq7Ks+6os+75s67ru2rrwi65r66os674qy74x27bwy7ouHJMnqqqnqq7rmarrqq5r26rr2rqmmq5suq4tm6or26os67Yry7aumaosm64r26bryrIqy77vyrJui67r66Ys67oqy8Lu6roxzLat+6Lr6roqy7qvyrKuu7ru+7JuC7umqrpuyrKvm7Ks+7auC8us27oxuq7vq7It/KosC7+u+8Iy6z5jdF1fV21ZGFbZ9n3d95Vj1nVhWW1b+V1bZ7y+bgy7bvzKrQvLstq2scy6rSyvrxvDLux8W/iVmqratum6um7Ksq/Lui60dd1XRtf1fdW2fV+VZd+3hV9pG8OwjK6r+6os68Jry8ov67qw7MIvLKttK7+r68ow27qw3L6wLL/uC8uq277v6rrStXVluX2fsSu38QsAABhwAAAIMKEMFBqyIgCIEwBAEHIOKQahYgpCCKGkEEIqFWNSMuakZM5JKaWUFEpJrWJMSuaclMwxKaGUlkopqYRSWiqlxBRKaS2l1mJKqcVQSmulpNZKSa2llGJMrcUYMSYlc05K5pyUklJrJZXWMucoZQ5K6iCklEoqraTUYuacpA46Kx2E1EoqMZWUYgupxFZKaq2kFGMrMdXUWo4hpRhLSrGVlFptMdXWWqs1YkxK5pyUzDkqJaXWSiqtZc5J6iC01DkoqaTUYiopxco5SR2ElDLIqJSUWiupxBJSia20FGMpqcXUYq4pxRZDSS2WlFosqcTWYoy1tVRTJ6XFklKMJZUYW6y5ttZqDKXEVkqLsaSUW2sx1xZjjqGkFksrsZWUWmy15dhayzW1VGNKrdYWY40x5ZRrrT2n1mJNMdXaWqy51ZZbzLXnTkprpZQWS0oxttZijTHmHEppraQUWykpxtZara3FXEMpsZXSWiypxNhirLXFVmNqrcYWW62ltVprrb3GVlsurdXcYqw9tZRrrLXmWFNtBQAADDgAAASYUAYKDVkJAEQBAADGMMYYhEYpx5yT0ijlnHNSKucghJBS5hyEEFLKnINQSkuZcxBKSSmUklJqrYVSUmqttQIAAAocAAACbNCUWByg0JCVAEAqAIDBcTRNFFXVdX1fsSxRVFXXlW3jVyxNFFVVdm1b+DVRVFXXtW3bFn5NFFVVdmXZtoWiqrqybduybgvDqKqua9uybeuorqvbuq3bui9UXVmWbVu3dR3XtnXd9nVd+Bmzbeu2buu+8CMMR9/4IeTj+3RCCAAAT3AAACqwYXWEk6KxwEJDVgIAGQAAgDFKGYUYM0gxphhjTDHGmAAAgAEHAIAAE8pAoSErAoAoAADAOeecc84555xzzjnnnHPOOeecc44xxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY0wAwE6EA8BOhIVQaMhKACAcAABACCEpKaWUUkoRU85BSSmllFKqFIOMSkoppZRSpBR1lFJKKaWUIqWgpJJSSimllElJKaWUUkoppYw6SimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaVUSimllFJKKaWUUkoppRQAYPLgAACVYOMMK0lnhaPBhYasBAByAwAAhRiDEEJpraRUUkolVc5BKCWUlEpKKZWUUqqYgxBKKqmlklJKKbXSQSihlFBKKSWUUkooJYQQSgmhlFRCK6mEUkoHoYQSQimhhFRKKSWUzkEoIYUOQkmllNRCSB10VFIpIZVSSiklpZQ6CKGUklJLLZVSWkqpdBJSKamV1FJqqbWSUgmhpFZKSSWl0lpJJbUSSkklpZRSSymFVFJJJYSSUioltZZaSqm11lJIqZWUUkqppdRSSiWlkEpKqZSSUmollZRSaiGVlEpJKaTUSimlpFRCSamlUlpKLbWUSkmptFRSSaWUlEpJKaVSSksppRJKSqmllFpJKYWSUkoplZJSSyW1VEoKJaWUUkmptJRSSymVklIBAEAHDgAAAUZUWoidZlx5BI4oZJiAAgAAQABAgAkgMEBQMApBgDACAQAAAADAAAAfAABHARAR0ZzBAUKCwgJDg8MDAAAAAAAAAAAAAACAT2dnUwAEAAAAAAAAAADqnjMlAgAAADzQPmcBAQA=');
  if (mpeg) canPlayThrough('audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'); // / lets find out!

  var time = new Date().getTime();
  var interval = window.setInterval(function () {
    var now = new Date().getTime();
    var maxExecution = now - time > 5000;

    if (!pending || maxExecution) {
      window.clearInterval(interval);
      onsuccess(supports);
    }
  }, 1);
};

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: audioDetect, loadScript, request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _audio_detect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio-detect */ "./src/utils/audio-detect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "audioDetect", function() { return _audio_detect__WEBPACK_IMPORTED_MODULE_0__["audioDetect"]; });

/* harmony import */ var _load_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./load-script */ "./src/utils/load-script.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadScript", function() { return _load_script__WEBPACK_IMPORTED_MODULE_1__["loadScript"]; });

/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request */ "./src/utils/request.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "request", function() { return _request__WEBPACK_IMPORTED_MODULE_2__["request"]; });





/***/ }),

/***/ "./src/utils/load-script.js":
/*!**********************************!*\
  !*** ./src/utils/load-script.js ***!
  \**********************************/
/*! exports provided: loadScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadScript", function() { return loadScript; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * -----------------------------------------------------------
 * loadScript.js : 0.1.4 : 2014/02/12 : http://mudcu.be
 * -----------------------------------------------------------
 * Copyright 2011-2014 Mudcube. All rights reserved.
 * -----------------------------------------------------------
 * // No verification
 * loadScript.add("../js/jszip/jszip.js")
 * // Strict loading order and verification.
 * loadScript.add({
 *   strictOrder: true,
 *   urls: [
 *     {
 *       url: "../js/jszip/jszip.js",
 *       verify: "JSZip",
 *       onsuccess: function() {
 *         console.log(1)
 *       }
 *     },
 *     {
 *       url: "../inc/downloadify/js/swfobject.js",
 *       verify: "swfobject",
 *       onsuccess: function() {
 *         console.log(2)
 *       }
 *     }
 *   ],
 *   onsuccess: function() {
 *     console.log(3)
 *   }
 * })
 * // Just verification.
 * loadScript.add({
 *   url: "../js/jszip/jszip.js",
 *   verify: "JSZip",
 *   onsuccess: function() {
 *     console.log(1)
 *   }
 * })
 */
var _globalExists = function _globalExists(path, root) {
  try {
    path = path.split('"').join('').split("'").join('').split(']').join('').split('[').join('.');
    var parts = path.split('.');
    var length = parts.length;
    var object = root || window;

    for (var n = 0; n < length; n++) {
      var key = parts[n];

      if (object[key] == null) {
        return false;
      } //


      object = object[key];
    }

    return true;
  } catch (e) {
    return false;
  }
};

var LoadScript = function LoadScript() {
  this.loaded = {};
  this.loading = {};
  return this;
};

LoadScript.prototype.add = function (config) {
  var that = this;

  if (typeof config === 'string') {
    config = {
      url: config
    };
  }

  var _config = config,
      urls = _config.urls;

  if (typeof urls === 'undefined') {
    urls = [{
      url: config.url,
      verify: config.verify
    }];
  } // / adding the elements to the head


  var doc = document.getElementsByTagName('head')[0]; // /

  var testElement = function testElement(element, test) {
    if (that.loaded[element.url]) return;
    if (test && _globalExists(test) === false) return;
    that.loaded[element.url] = true; //

    if (that.loading[element.url]) that.loading[element.url]();
    delete that.loading[element.url]; //

    if (element.onsuccess) element.onsuccess();
    if (typeof getNext !== 'undefined') getNext();
  }; // /


  var hasError = false;
  var batchTest = [];

  var addElement = function addElement(element) {
    if (typeof element === 'string') {
      element = {
        url: element,
        verify: config.verify
      };
    }

    if (/([\w\d.\[\]'"])$/.test(element.verify)) {
      // check whether its a variable reference
      var verify = element.test = element.verify;

      if (_typeof(verify) === 'object') {
        for (var n = 0; n < verify.length; n++) {
          batchTest.push(verify[n]);
        }
      } else {
        batchTest.push(verify);
      }
    }

    if (that.loaded[element.url]) return;
    var script = document.createElement('script');

    script.onreadystatechange = function () {
      if (this.readyState !== 'loaded' && this.readyState !== 'complete') return;
      testElement(element);
    };

    script.onload = function () {
      testElement(element);
    };

    script.onerror = function () {
      hasError = true;
      delete that.loading[element.url];

      if (_typeof(element.test) === 'object') {
        for (var key in element.test) {
          removeTest(element.test[key]);
        }
      } else {
        removeTest(element.test);
      }
    };

    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', element.url);
    doc.appendChild(script);

    that.loading[element.url] = function () {};
  }; // / checking to see whether everything loaded properly


  var removeTest = function removeTest(test) {
    var ret = [];

    for (var n = 0; n < batchTest.length; n++) {
      if (batchTest[n] === test) continue;
      ret.push(batchTest[n]);
    }

    batchTest = ret;
  };

  var onLoad = function onLoad(element) {
    if (element) {
      testElement(element, element.test);
    } else {
      for (var n = 0; n < urls.length; n++) {
        testElement(urls[n], urls[n].test);
      }
    }

    var istrue = true;

    for (var _n = 0; _n < batchTest.length; _n++) {
      if (_globalExists(batchTest[_n]) === false) {
        istrue = false;
      }
    }

    if (!config.strictOrder && istrue) {
      // finished loading all the requested scripts
      if (hasError) {
        if (config.error) {
          config.error();
        }
      } else if (config.onsuccess) {
        config.onsuccess();
      }
    } else {
      // keep calling back the function
      setTimeout(function () {
        // - should get slower over time?
        onLoad(element);
      }, 10);
    }
  }; // / loading methods;  strict ordering or loose ordering


  if (config.strictOrder) {
    var ID = -1;

    var getNext = function getNext() {
      ID++;

      if (!urls[ID]) {
        // all elements are loaded
        if (hasError) {
          if (config.error) {
            config.error();
          }
        } else if (config.onsuccess) {
          config.onsuccess();
        }
      } else {
        // loading new script
        var element = urls[ID];
        var url = element.url;

        if (that.loading[url]) {
          // already loading from another call (attach to event)
          that.loading[url] = function () {
            if (element.onsuccess) element.onsuccess();
            getNext();
          };
        } else if (!that.loaded[url]) {
          // create script element
          addElement(element);
          onLoad(element);
        } else {
          // it's already been successfully loaded
          getNext();
        }
      }
    };

    getNext();
  } else {
    // loose ordering
    for (var _ID = 0; _ID < urls.length; _ID++) {
      addElement(urls[_ID]);
      onLoad(urls[_ID]);
    }
  }
};

var loadScript = new LoadScript();

/***/ }),

/***/ "./src/utils/request.js":
/*!******************************!*\
  !*** ./src/utils/request.js ***!
  \******************************/
/*! exports provided: request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
/*
 * ----------------------------------------------------------
 * Request : 0.1.1 : 2015-03-26
 * ----------------------------------------------------------
 * request({
 *   url: './dir/something.extension',
 *   data: 'test!',
 *   format: 'text', // text | xml | json | binary
 *   responseType: 'text', // arraybuffer | blob | document | json | text
 *   headers: {},
 *   withCredentials: true, // true | false
 *
 *   onerror: function(evt, percent) {
 *     console.log(evt)
 *   },
 *   onsuccess: function(evt, responseText) {
 *     console.log(responseText)
 *   },
 *   onprogress: function(evt, percent) {
 *     percent = Math.round(percent * 100)
 *     loader.create('thread', 'loading... ', percent)
 *   }
 * })
 */
function request(opts, onsuccess, onerror, onprogress) {
  if (typeof opts === 'string') opts = {
    url: opts
  };
  var _opts = opts,
      data = _opts.data;
  var _opts2 = opts,
      url = _opts2.url;
  var method = opts.method || (opts.data ? 'POST' : 'GET');
  var _opts3 = opts,
      format = _opts3.format;
  var _opts4 = opts,
      headers = _opts4.headers;
  var _opts5 = opts,
      responseType = _opts5.responseType;
  var withCredentials = opts.withCredentials || false;
  var xhr = new window.XMLHttpRequest();
  onsuccess = onsuccess || opts.onsuccess;
  onerror = onerror || opts.onerror;
  onprogress = onprogress || opts.onprogress;
  xhr.open(method, url, true);

  if (headers) {
    for (var type in headers) {
      xhr.setRequestHeader(type, headers[type]);
    }
  } else if (data) {
    // set the default headers for POST
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }

  if (format === 'binary') {
    // - default to responseType="blob" when supported
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
    }
  }

  if (responseType) {
    xhr.responseType = responseType;
  }

  if (withCredentials) {
    xhr.withCredentials = 'true';
  }

  if (onerror && 'onerror' in xhr) {
    xhr.onerror = onerror;
  }

  if (onprogress && xhr.upload && 'onprogress' in xhr.upload) {
    if (data) {
      xhr.upload.onprogress = function (evt) {
        onprogress.call(xhr, evt, evt.loaded / evt.total);
      };
    } else {
      xhr.addEventListener('progress', function (evt) {
        var totalBytes = 0;

        if (evt.lengthComputable) {
          totalBytes = evt.total;
        } else if (xhr.totalBytes) {
          totalBytes = xhr.totalBytes;
        } else {
          var rawBytes = parseInt(xhr.getResponseHeader('Content-Length-Raw'));

          if (isFinite(rawBytes)) {
            xhr.totalBytes = totalBytes = rawBytes;
          } else {
            return;
          }
        }

        onprogress.call(xhr, evt, evt.loaded / totalBytes);
      });
    }
  } // /


  xhr.onreadystatechange = function (evt) {
    if (xhr.readyState === 4) {
      // The request is complete
      if (xhr.status === 200 || // Response OK
      xhr.status === 304 || // Not Modified
      xhr.status === 308 // Permanent Redirect
      ) {
          if (onsuccess) {
            var res;

            if (format === 'xml') {
              res = evt.target.responseXML;
            } else if (format === 'text') {
              res = evt.target.responseText;
            } else if (format === 'json') {
              try {
                res = JSON.parse(evt.target.response);
              } catch (err) {
                onerror && onerror.call(xhr, evt);
              }
            }

            onsuccess.call(xhr, evt, res);
          }
        } else {
        onerror && onerror.call(xhr, evt);
      }
    }
  };

  xhr.send(data);
  return xhr;
}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/stephen/Documents/Projects/midi.js/src/index.js */"./src/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=midi.js.map
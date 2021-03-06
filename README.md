# midi.js

A modern JavaScript port of MIDI.js.

Forked from [SuneBear/midi.js](https://github.com/SuneBear/midi.js), which modernized the original library [mudcube/midi.js](https://github.com/mudcube/MIDI.js) in 2016. Thanks to the original contributors of both repos, especially [mudcube](https://github.com/mudcube)!

## Goals

This is an opinionated, modern port of midi.js that intends to:

- Modernize with tools from babel's [preset-env](https://babeljs.io/docs/en/babel-preset-env), webpack, and more
- Use [prettier](https://prettier.io/) and [eslint](https://eslint.org/), following a revised version of [Airbnb's JS style guide](https://github.com/airbnb/javascript) and their [eslint config](https://www.npmjs.com/package/eslint-config-airbnb-base)
- Add controller change playback support (e.g. sustain) and some other quality of life changes

## API Deviations from mudcube/midi.js and SuneBear/midi.js

1. `MIDI.Player.addListener(function (data) => {})` now supports listening to MIDI controller events (e.g. sustain)
2. `MIDI.Player.addListener` and `MIDI.Player.removeListener` now supports adding multiple listeners and removing a specific listener (instead of just replacing the same one). Types are below:

### MIDI.Player types

```javascript
type MIDIEvent = {|
  channel: ?number,
  note: ?number,
  now: number,
  end: number,
  message: number,
  velocity: ?number,
|};

type Player = {
  // Now returns the listener you provided and will not replace the existing listener
  addListener: (
    (midiEvent: MIDIEvent) => void
  ) => (midiEvent: MIDIEvent) => void,

  // Now removes the listener you specify instead of removing the (only) existing listener
  // If no listener is provided, removes all listeners.
  // Returns whether or not a listener was removed
  removeListener: (listener: ?(midiEvent: MIDIEvent) => void) => boolean,
  ...
};
```

## Examples

- [MIDI Player](http://wustep.github.io/midi.js/MIDIPlayer.html)
- [Whitney Music Box](http://wustep.github.io/midi.js/WhitneyMusicBox.html)

## Installation

```bash
npm install https://github.com/wustep/midi.js
yarn add https://github.com/wustep/midi.js
```

## Usage

```JavaScript
import MIDI from 'midi.js';
```

## Usage & API

#### [loader.js](./src/loader.js) - Decides which framework is best to use

```javascript
// interface to download soundfont, then execute callback
MIDI.loadPlugin(onsuccess);
// simple example to get started
MIDI.loadPlugin({
  instrument: 'acoustic_grand_piano', // or the instrument code 1 (aka the default)
  instruments: ['acoustic_grand_piano', 'acoustic_guitar_nylon'], // or multiple instruments
  onsuccess: function () {},
});
```

#### [plugins/webaudio.js](./src/plugins/webaudio.js) - Controls MIDI output

```javascript
MIDI.noteOn(channel, note, velocity, delay);
MIDI.noteOff(channel, note, delay);
MIDI.chordOn(channel, [note, note, note], velocity, delay);
MIDI.chordOff(channel, [note, note, note], delay);
MIDI.keyToNote = object; // A0 => 21
MIDI.noteToKey = object; // 21 => A0
```

#### [player.js](./src/player.js) - Plays MIDI stream

```javascript
MIDI.Player.currentTime = integer; // time we are at now within the song.
MIDI.Player.endTime = integer; // time when song ends.
MIDI.Player.playing = boolean; // are we playing? yes or no.
MIDI.Player.loadFile(file, onsuccess); // load .MIDI from base64 or binary XML request.
MIDI.Player.start(); // start the MIDI track (you can put this in the loadFile callback)
MIDI.Player.resume(); // resume the MIDI track from pause.
MIDI.Player.pause(); // pause the MIDI track.
MIDI.Player.stop(); // stops all audio being played, and resets currentTime to 0.
```

#### Listener for when notes are played

```javascript
const listener = MIDI.Player.addListener(function (data) {
  // set it to your own function!
  const now = data.now; // where we are now
  const end = data.end; // time when song ends
  const channel = data.channel; // channel note is playing on
  const message = data.message; // 128 is noteOff, 144 is noteOn
  const note = data.note; // the note
  const velocity = data.velocity; // the velocity of the note
  // then do whatever you want with the information!
});
MIDI.Player.removeListener(listener);
```

#### Smooth animation interpolating between onMidiEvent calls

```javascript
MIDI.Player.clearAnimation(); // clears current animation.
MIDI.Player.setAnimation(function (data) {
  const now = data.now; // where we are now
  const end = data.end; // time when song ends
  const events = data.events; // all the notes currently being processed
  // then do what you want with the information!
});
```

Refer to https://github.com/mudcube/MIDI.js#api for more details.

## License

[MIT](./LICENSE)

const clone = function (o) {
  if (typeof o !== 'object') return o;
  if (o === null) return o;
  const ret = typeof o.length === 'number' ? [] : {};
  for (const key in o) ret[key] = clone(o[key]);
  return ret;
};

export function Replayer(midiFile, timeWarp, eventProcessor, bpm) {
  const trackStates = [];
  let beatsPerMinute = bpm || 120;
  const bpmOverride = !!bpm;
  const { ticksPerBeat } = midiFile.header;

  for (let i = 0; i < midiFile.tracks.length; i++) {
    trackStates[i] = {
      nextEventIndex: 0,
      ticksToNextEvent: midiFile.tracks[i].length
        ? midiFile.tracks[i][0].deltaTime
        : null,
    };
  }

  function getNextEvent() {
    let ticksToNextEvent = null;
    let nextEventTrack = null;
    let nextEventIndex = null;

    for (let i = 0; i < trackStates.length; i++) {
      if (
        trackStates[i].ticksToNextEvent != null &&
        (ticksToNextEvent == null ||
          trackStates[i].ticksToNextEvent < ticksToNextEvent)
      ) {
        ticksToNextEvent = trackStates[i].ticksToNextEvent;
        nextEventTrack = i;
        nextEventIndex = trackStates[i].nextEventIndex;
      }
    }
    if (nextEventTrack != null) {
      /* consume event from that track */
      const nextEvent = midiFile.tracks[nextEventTrack][nextEventIndex];
      if (midiFile.tracks[nextEventTrack][nextEventIndex + 1]) {
        trackStates[nextEventTrack].ticksToNextEvent +=
          midiFile.tracks[nextEventTrack][nextEventIndex + 1].deltaTime;
      } else {
        trackStates[nextEventTrack].ticksToNextEvent = null;
      }
      trackStates[nextEventTrack].nextEventIndex += 1;
      /* advance timings on all tracks by ticksToNextEvent */
      for (let i = 0; i < trackStates.length; i++) {
        if (trackStates[i].ticksToNextEvent != null) {
          trackStates[i].ticksToNextEvent -= ticksToNextEvent;
        }
      }
      return {
        ticksToEvent: ticksToNextEvent,
        event: nextEvent,
        track: nextEventTrack,
      };
    }
    return null;
  }
  //
  let midiEvent;
  const temporal = [];
  ~(function processEvents() {
    function processNext() {
      if (
        !bpmOverride &&
        midiEvent.event.type === 'meta' &&
        midiEvent.event.subtype === 'setTempo'
      ) {
        // tempo change events can occur anywhere in the middle and affect events that follow
        beatsPerMinute = 60000000 / midiEvent.event.microsecondsPerBeat;
      }
      // /
      let beatsToGenerate = 0;
      let secondsToGenerate = 0;
      if (midiEvent.ticksToEvent > 0) {
        beatsToGenerate = midiEvent.ticksToEvent / ticksPerBeat;
        secondsToGenerate = beatsToGenerate / (beatsPerMinute / 60);
      }
      // /
      const time = secondsToGenerate * 1000 * timeWarp || 0;
      temporal.push([midiEvent, time]);
      midiEvent = getNextEvent();
    }
    // /
    midiEvent = getNextEvent();
    if (midiEvent) {
      while (midiEvent) processNext(true);
    }
  })();

  return {
    getData() {
      return clone(temporal);
    },
  };
}

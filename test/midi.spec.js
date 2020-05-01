import chai from 'chai';
import MIDI from '../lib/midi';

chai.expect();
const { expect } = chai;

describe('MIDI Library', function () {
  describe('#loadScript.add()', function () {
    it('should be ok', () => {
      MIDI.loadScript.add({
        url: '../src/index.js',
        onsuccess() {
          expect(midi.name).to.be.equal('Library');
          console.log(1);
        },
      });
    });
  });
});

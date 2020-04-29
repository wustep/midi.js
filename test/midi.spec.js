import chai from 'chai';
import midi from '../lib/midi';

chai.expect();

const { expect } = chai;

describe('MIDI Library', function () {
  describe('#loadScript.add()', function () {
    it('should be ok', () => {
      midi.loadScript.add({
        url: '../src/index.js',
        onsuccess() {
          expect(midi.name).to.be.equal('Library');
          console.log(1);
        },
      });
    });
  });
});

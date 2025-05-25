import root from './root';
import './loader';
import './gm';
import './player';
import './plugins';

// Expose to window when running in browser context
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).MIDI = root;
}

export default root;

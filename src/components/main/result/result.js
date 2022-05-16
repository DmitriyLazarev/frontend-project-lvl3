import onChange from 'on-change';
import dataParser from '../common/dataParser.js';
import renderer from './renderers/renderer.js';
import globalState from '../common/state.js';
import checkUpdates from './check-updates.js';

const result = (data, urlId, resultContainer) => {
  const state = onChange(globalState, (path) => {
    switch (path) {
      case 'feeds':
      case 'posts':
        renderer(state, resultContainer);
        break;

      default:
        throw new Error(`Unknown state path: ${path}`);
    }
  });

  const [feed, posts] = dataParser(data);
  state.feeds.unshift({ urlId, ...feed });
  state.posts.unshift({ urlId, posts });

  const delay = 5000;
  setTimeout(function timer() {
    checkUpdates(state)
      .then(() => setTimeout(timer, delay))
      .catch((e) => console.log(e));
  }, delay);
};

export default result;

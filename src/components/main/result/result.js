import onChange from 'on-change';
import dataParser from '../common/dataParser.js';
import renderer from './renderers/renderer.js';
import modalRenderer from './renderers/modal-renderer.js';
import globalState from '../common/state.js';
import checkUpdates from './check-updates.js';

const result = (data, urlId, resultContainer) => {
  const state = onChange(globalState, (path, value) => {
    switch (path) {
      case 'feeds':
      case 'posts':
      case 'readPosts':
        renderer(state, resultContainer);
        break;

      case 'activePostId':
        modalRenderer(value, state);
        console.log(state);

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

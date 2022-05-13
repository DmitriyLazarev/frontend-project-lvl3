import onChange from 'on-change';
import dataParser from '../common/dataParser.js';
import renderer from './renderers/renderer.js';

const result = (data, id, resultContainer, state) => {
  const resultState = onChange(state, (path) => {
    switch (path) {
      case 'feeds':
      case 'posts':
        renderer(resultState, resultContainer);
        break;

      default:
        throw new Error(`Unknown state path: ${path}`);
    }
  });

  const [feed, posts] = dataParser(data);
  state.feeds.unshift({ urlId: id, ...feed });
  state.posts.unshift({ urlId: id, posts });
};

export default result;

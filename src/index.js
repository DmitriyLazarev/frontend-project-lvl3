import rss from './components/rss.js';

const app = () => {
  const globalState = {
    form: {
      processState: 'filling',
      errors: {},
      valid: true,
    },
    urls: [],
    feeds: [],
    posts: [],
    readPosts: [],
    activePostId: null,
  };

  rss(globalState);
};

export default app;

// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import { union, differenceBy } from 'lodash';
import uniqueId from 'lodash/uniqueId.js';
import parseRSS from './parser-rss.js';
import fetchRSS from './fetch-rss.js';

const checkUpdates = (state, delay = 5000) => {
  const requests = state.feeds.map((feed) => fetchRSS(feed.url)
    .then((data) => {
      const [, posts] = parseRSS(data.data.contents);
      const postsList = union(posts, state.posts);
      const newPosts = differenceBy(postsList, state.posts, 'link')
        .map((post) => {
          post.id = uniqueId();
          return post;
        });
      if (newPosts.length > 0) {
        state.posts = [...newPosts, ...state.posts];
      }
    })
    .catch((err) => {
      console.error(err);
    }));

  return Promise.all(requests)
    .then(() => {
      setTimeout(() => checkUpdates(state), delay);
    });
};

export default checkUpdates;

// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import { indexOf } from 'lodash';
import parseRSS, { fetchRSS } from './parser-rss.js';

const checkUpdates = (state) => {
  const requests = state.urls.map((url) => fetchRSS(url.url)
    .catch((err) => {
      console.error(err);
    })
    .then((data) => parseRSS(data.data.contents))
    .then((data) => {
      const [, posts] = data;
      return { urlId: url.id, posts };
    }));

  return Promise.all(requests)
    .then((data) => {
      data.forEach((item) => {
        const oldPosts = state.posts.find((post) => post.urlId === item.urlId);

        const lastOldPost = oldPosts.posts[0];
        const lastOldPostInNewData = item.posts.find((post) => post.title === lastOldPost.title);
        const lastOldPostIndex = indexOf(item.posts, lastOldPostInNewData);
        const newData = [];
        for (let i = 0; i < lastOldPostIndex; i += 1) {
          newData.unshift(item.posts[i]);
        }
        if (newData.length > 0) {
          state.posts.unshift({ urlId: item.urlId, posts: newData });
        }
      });
    });
};

export default checkUpdates;

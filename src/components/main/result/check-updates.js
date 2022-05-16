// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import { indexOf } from 'lodash';
import rssParser from '../form/modules/rss-parser.js';
import dataParser from '../common/dataParser.js';

const createNewData = (state) => {
  const result = [];
  const resultIds = [];
  state.urls.forEach((url) => {
    result.unshift(rssParser(url.url));
    resultIds.unshift(url.id);
  });
  return [resultIds, Promise.all(result)];
};

const checkUpdates = (state) => {
  const newParsedData = [];
  const [urlIds, promiseAll] = createNewData(state);
  promiseAll
    .then((data) => {
      data.forEach((item) => {
        const itemIndex = indexOf(data, item);
        const [, posts] = dataParser(item, state);
        newParsedData.push({ urlId: urlIds[itemIndex], posts });
      });
      newParsedData.forEach((item) => {
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
    })
    .catch((error) => error);
  return promiseAll;
};

export default checkUpdates;

// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import rssParser from './rss-parser.js';
import dataParser from '../../common/dataParser.js';

const checkUpdates = (state) => {
  console.log('Checking...');
  state.urls.forEach((url) => {
    const parser = rssParser(url.url);
    return parser
      .then((data) => {
        const [, posts] = dataParser(data);
        let oldPosts = [];
        state.posts.forEach((post) => {
          if (post.urlId === url.id) {
            oldPosts = [...post.posts];
          }
        });

        posts.forEach((post) => {
          let checker = 0;
          oldPosts.forEach((oldPost) => {
            if (post.link === oldPost.link) {
              checker += 1;
            }
          });
          if (checker === 0) {
            console.log(post);
          }
        });
      })
      .catch((error) => console.log(error));
  });
  console.log('Finished...');
};

export default checkUpdates;

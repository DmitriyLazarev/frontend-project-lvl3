// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import onChange from 'on-change';
import uniqueId from 'lodash/uniqueId.js';
import i18next from 'i18next';
import globalState from './state.js';

const renderer = (state, resultContainer) => {
  resultContainer.innerHTML = '';

  const row = document.createElement('div');
  row.classList.add('row');

  const postsColumn = document.createElement('div');
  postsColumn.classList.add('col-md-10', 'col-lg-8', 'order-1', 'mx-auto');

  const postsTitle = document.createElement('h2');
  postsTitle.classList.add('h2');
  postsTitle.textContent = i18next.t('content.postsTitle');
  postsColumn.append(postsTitle);

  const postsList = document.createElement('ul');
  postsList.classList.add('list-group', 'border-0', 'rounded-0');
  postsColumn.append(postsList);

  const feedsColumn = document.createElement('div');
  feedsColumn.classList.add('col-md-10', 'col-lg-4', 'order-0', 'order-lg-1', 'mx-auto');

  const feedsTitle = document.createElement('h2');
  feedsTitle.classList.add('h2');
  feedsTitle.textContent = i18next.t('content.feedsTitle');
  feedsColumn.append(feedsTitle);

  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  feedsColumn.append(feedsList);

  state.posts.forEach((post) => {
    const postBlock = document.createElement('li');
    postBlock.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0', 'ps-0', 'pr-0');

    const link = document.createElement('a');
    link.setAttribute('href', post.link);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.classList.add('fw-bold', 'link-secondary');
    link.textContent = post.title;

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-post-id', post.id);
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'ms-2');
    button.textContent = i18next.t('content.watchButton');

    postBlock.append(link, button);
    postsList.append(postBlock);
  });

  state.feeds.forEach((feed) => {
    const feedBlock = document.createElement('li');
    feedBlock.classList.add('list-group-item', 'border-0', 'border-end-0', 'ps-0', 'pr-0');

    const title = document.createElement('h3');
    title.classList.add('h3');
    title.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;

    feedBlock.append(title, description);
    feedsList.append(feedBlock);
  });

  row.append(postsColumn, feedsColumn);
  resultContainer.append(row);
};

const dataParser = (data) => {
  const feed = {
    id: uniqueId(),
    title: data.querySelector('title').textContent,
    description: data.querySelector('description').textContent,
  };

  const items = data.querySelectorAll('item');
  const posts = [];
  items.forEach((item) => {
    let content = '';
    const descriptionBlock = item.querySelector('description') !== null;
    const contentBlock = item.getElementsByTagNameNS('*', 'encoded').item(0) !== null;
    if (descriptionBlock !== null) {
      content = descriptionBlock.textContent;
    }
    if (contentBlock !== null) {
      content = contentBlock.textContent;
    }
    const post = {
      id: uniqueId(),
      feedId: feed.id,
      title: item.querySelector('title').textContent,
      content,
      link: item.querySelector('link').textContent,
    };
    posts.push(post);
  });

  return [feed, posts];
};

const rssRenderer = (data, resultContainer) => {
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
  state.feeds.unshift(feed);
  state.posts.unshift(...posts);
};

export default rssRenderer;

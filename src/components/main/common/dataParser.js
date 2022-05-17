import uniqueId from 'lodash/uniqueId.js';

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
    const descriptionBlock = item.querySelector('description');
    const contentBlock = item.getElementsByTagNameNS('*', 'encoded').item(0);
    if (descriptionBlock !== null) {
      content = descriptionBlock.textContent;
    }
    if (contentBlock !== null) {
      content = contentBlock.textContent;
    }
    const post = {
      id: uniqueId(),
      title: item.querySelector('title').textContent,
      content,
      link: item.querySelector('link').textContent,
    };
    posts.push(post);
  });
  return [feed, posts];
};

export default dataParser;

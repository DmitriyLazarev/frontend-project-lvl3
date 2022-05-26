const parserRSS = (rssContent) => {
  const data = new DOMParser().parseFromString(rssContent, 'text/xml');

  const rss = data.querySelectorAll('rss');

  if (rss.length === 0) {
    const error = new Error('Parsing error');
    error.isParsingError = true;
    throw error;
  }

  const feed = {
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
      title: item.querySelector('title').textContent,
      content,
      link: item.querySelector('link').textContent,
    };
    posts.push(post);
  });
  return [feed, posts];
};

export default parserRSS;

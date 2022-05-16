import axios from 'axios';

const rssParser = (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((data) => new DOMParser().parseFromString(data.data.contents, 'text/xml'))
  .then((data) => data)
  .catch((error) => error);

export default rssParser;

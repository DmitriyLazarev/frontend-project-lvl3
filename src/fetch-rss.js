import axios from 'axios';

const fetchRSS = (originalUrl) => {
  const url = new URL('https://allorigins.hexlet.app/get');
  url.searchParams.set('disableCache', 'true');
  url.searchParams.set('url', originalUrl);

  return axios.get(url);
};

export default fetchRSS;

const env = require('../.env');

export default {
  port: '3005',
  mongoUrl: 'mongodb://localhost:27017/movie-search-db',
  bodyLimit: '100kb',
  apiKey: env.apiKey,
  apiUrl: 'https://api.themoviedb.org/3',
};

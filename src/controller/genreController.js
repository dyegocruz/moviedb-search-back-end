import { Router } from 'express';
import request from 'request';
import Genre from '../model/genre';

export default (config) => {
  const api = Router();

  api.get('/', (req, res) => {
    Genre.find({}, (err, genres) => {
      if (err) {
        res.send(err);
      }
      console.log(typeof genres);
      if (genres === {}) {
        // https://api.themoviedb.org/3/genre/movie/list?api_key=26fe6f55e55736490dee0811901cccac&&language=pt-BR
        request('https://api.themoviedb.org/3/genre/movie/list?api_key=26fe6f55e55736490dee0811901cccac&&language=pt-BR', (error, response, body) => {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
        });
      }

      res.json(genres);
    });
  });

  return api;
};

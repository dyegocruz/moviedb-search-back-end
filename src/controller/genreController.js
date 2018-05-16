import { Router } from 'express';
import axios from 'axios';
import queryString from 'query-string';
import Genre from '../model/genre';

export default ({ config }) => {
  const api = Router();

  api.get('/', (req, res) => {
    Genre.find({}, (err, genres) => {
      if (err) {
        res.send(err);
      }

      if (genres.length === 0) {
        const params = {
          api_key: config.apiKey,
          language: 'pt-BR',
        };
        const paramsStringify = queryString.stringify(params);

        axios.get(`${config.apiUrl}/genre/movie/list?${paramsStringify}`)
          .then((response) => {
            if (response.status === 200) {
              if (response.data.genres.length > 0) {
                Genre.insertMany(response.data.genres, (errInsert, newGenres) => {
                  if (errInsert) {
                    res.send(errInsert);
                  }
                  res.json(newGenres);
                });
              }
            }
          })
          .catch((e) => {
            res.send(e.response.data);
          });
      } else {
        res.json(genres);
      }
    });
  });

  return api;
};

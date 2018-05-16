import { Router } from 'express';
import axios from 'axios';
import queryString from 'query-string';
import Movie from '../model/movie';
import Serie from '../model/serie';

export default ({ config }) => {
  const api = Router();

  api.get('/popular/movie', (req, res) => {
    const params = {
      api_key: config.apiKey,
      language: 'pt-BR',
      sort_by: 'popularity.desc',
    };
    const paramsStringify = queryString.stringify(params);

    axios.get(`${config.apiUrl}/discover/movie?${paramsStringify}`)
      .then((response) => {
        response.data.results.forEach((movieElement) => {
          Movie.findOne({ id: movieElement.id }, (err, movie) => {
            if (err) {
              res.send(err);
            }
            if (movie === null) {
              const newMovie = new Movie(movieElement);
              newMovie.save((errSave) => {
                if (errSave) {
                  res.send(errSave);
                }
              });
            }
          });
        });

        res.json(response.data.results);
      })
      .catch((e) => {
        res.send(e.response.data);
      });
  });

  api.get('/popular/tv', (req, res) => {
    const params = {
      api_key: config.apiKey,
      language: 'pt-BR',
      sort_by: 'popularity.desc',
    };
    const paramsStringify = queryString.stringify(params);

    axios.get(`${config.apiUrl}/discover/tv?${paramsStringify}`)
      .then((response) => {
        response.data.results.forEach((serieElement) => {
          Serie.findOne({ id: serieElement.id }, (err, serie) => {
            if (err) {
              res.send(err);
            }
            if (serie === null) {
              const newSerie = new Serie(serieElement);
              newSerie.save((errSave) => {
                if (errSave) {
                  res.send(errSave);
                }
              });
            }
          });
        });

        res.json(response.data.results);
      })
      .catch((e) => {
        res.send(e.response.data);
      });
  });

  return api;
};

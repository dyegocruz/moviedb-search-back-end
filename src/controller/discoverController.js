import { Router } from 'express';
import axios from 'axios';
import queryString from 'query-string';
import { mountParams } from '../utils/StringUtils';
import Movie from '../model/movie';
import Serie from '../model/serie';

export default ({ config }) => {
  const api = Router();

  api.get('/popular/movie', (req, res) => {
    const params = mountParams({ apiKey: config.apiKey, sort_by: 'popularity.desc' });
    axios.get(`${config.apiUrl}/discover/movie?${params}`)
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
    const params = mountParams({ apiKey: config.apiKey, sort_by: 'popularity.desc' });
    axios.get(`${config.apiUrl}/discover/tv?${params}`)
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

  const populateMovies = ({ params, res }) => {
    console.log(params);
    axios.get(`${config.apiUrl}/discover/movie?${queryString.stringify(params)}`)
      .then((response) => {
        console.log(response.headers['x-ratelimit-remaining']);
        const newParams = params;
        newParams.page = params.page + 1;
        // console.log(newParams);
        if (response.headers['x-ratelimit-remaining'] > 0) {
          response.data.results.forEach((movieElement) => {
            Movie.update({ id: movieElement.id }, { $set: movieElement }, (err) => {
              if (err) {
                res.send(err);
              }
            });
          });

          if (params.page < 1001) {
            populateMovies({ params: newParams, res });
          } else {
            res.send('Populate concluded');
          }
        } else {
          setTimeout(populateMovies({ params: newParams, res }), 10000);
        }
      }).catch((err) => {
        res.send(err.response.data);
      });
  };

  const populateSeries = ({ params, res }) => {
    console.log(params);
    axios.get(`${config.apiUrl}/discover/tv?${queryString.stringify(params)}`)
      .then((response) => {
        console.log(response.headers['x-ratelimit-remaining']);
        const newParams = params;
        newParams.page = params.page + 1;
        // console.log(newParams);
        if (response.headers['x-ratelimit-remaining'] > 0) {
          response.data.results.forEach((serieElement) => {
            Serie.update({ id: serieElement.id }, { $set: serieElement }, (err) => {
              if (err) {
                res.send(err);
              }
            });
          });

          if (params.page < 1001) {
            populateMovies({ params: newParams, res });
          } else {
            res.send('Populate concluded');
          }
        } else {
          setTimeout(populateMovies({ params: newParams, res }), 10000);
        }
      }).catch((err) => {
        res.send(err.response.data);
      });
  };

  api.get('/populate/movies', (req, res) => {
    const params = mountParams({ apiKey: config.apiKey, sort: 'popularity.asc', page: 1 });
    populateMovies({ params, res });
  });

  api.get('/populate/series', (req, res) => {
    const params = mountParams({ apiKey: config.apiKey, sort: 'popularity.asc', page: 1 });
    populateSeries({ params, res });
  });

  return api;
};


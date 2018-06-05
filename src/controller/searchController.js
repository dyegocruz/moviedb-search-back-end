import { Router } from 'express';
import axios from 'axios';
import { mountParams } from '../utils/StringUtils';
import Movie from '../model/movie';
import Serie from '../model/serie';

export default ({ config }) => {
  const api = Router();

  api.post('/movie', (req, res) => {
    const params = mountParams({ apiKey: config.apiKey, query: req.body.query.split(' ').join('+') });

    let queryDbParam = req.body.query;
    queryDbParam = queryDbParam.trim().split(' ').join('.*.');

    Movie.find({
      $and: ([
        {
          $or: [
            { original_title: { $regex: queryDbParam, $options: 'i' } },
            { title: { $regex: queryDbParam, $options: 'i' } },
          ],
        },
      ]),
    }, (err, movies) => {
      if (err) {
        res.send(err);
      }

      if (movies.length === 0) {
        console.log('API');
        axios.get(`${config.apiUrl}/search/movie/?${params}`)
          .then((response) => {
            if (response.data.results.length > 0) {
              response.data.results.forEach((movieElement) => {
                Movie.findOne({ id: movieElement.id }, (errFind, movie) => {
                  if (errFind) {
                    res.send(errFind);
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
            }
          });
      } else {
        console.log('DATABASE');
        res.json(movies);
      }
    });
  });

  api.post('/serie', (req, res) => {
    // const params = {
    //   api_key: config.apiKey,
    //   language: 'pt-BR',
    //   query: req.body.query.split(' ').join('+'),
    // };
    // const paramsStringify = queryString.stringify(params);
    const params = mountParams({ apiKey: config.apiKey, query: req.body.query.split(' ').join('+') });

    let queryDbParam = req.body.query;
    queryDbParam = queryDbParam.trim().split(' ').join('.*.');

    Serie.find({
      $and: ([
        {
          $or: [
            { original_name: { $regex: queryDbParam, $options: 'i' } },
            { name: { $regex: queryDbParam, $options: 'i' } },
          ],
        },
      ]),
    }, (err, series) => {
      if (err) {
        res.send(err);
      }

      if (series.length === 0) {
        console.log('API');
        axios.get(`${config.apiUrl}/search/tv/?${params}`)
          .then((response) => {
            if (response.data.results.length > 0) {
              response.data.results.forEach((serieElement) => {
                Serie.findOne({ id: serieElement.id }, (errFind, serie) => {
                  if (errFind) {
                    res.send(errFind);
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
            }
          });
      } else {
        console.log('DATABASE');
        res.json(series);
      }
    });
  });

  return api;
};

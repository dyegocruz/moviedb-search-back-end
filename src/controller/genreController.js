import { Router } from 'express';
import Genre from '../model/genre';

export default () => {
  const api = Router();

  api.get('/', (req, res) => {
    Genre.find({}, (err, genres) => {
      if (err) {
        res.send(err);
      }
      res.json(genres);
    });
  });

  return api;
};

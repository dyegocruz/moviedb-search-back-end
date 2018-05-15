import express from 'express';
import config from './index';
import middleware from '../middleware';
import initializeDb from './database';
import genre from '../controller/genreController';

const router = express();

initializeDb((db) => {
  router.use(middleware({ config, db }));
  router.use('/genre', genre({ config, db }));
});

export default router;

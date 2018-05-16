import express from 'express';
import config from './index';
import middleware from '../middleware';
import initializeDb from './database';
import genre from '../controller/genreController';
// import movie from '../controller/movieController';
import discover from '../controller/discoverController';
import search from '../controller/searchController';

const router = express();

initializeDb((db) => {
  router.use(middleware({ config, db }));
  router.use('/discover', discover({ config, db }));
  router.use('/search', search({ config, db }));
  router.use('/genres', genre({ config, db }));
});

export default router;

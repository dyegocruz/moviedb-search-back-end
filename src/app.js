import http from 'http';
import express from 'express';
// import queryParser from 'express-query-int';
import bodyParser from 'body-parser';
// import cors from 'cors';

import config from './config';
import routes from './config/routes';

const app = express();
app.server = http.createServer(app);

// middleware
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// passport config

// api routes v1
app.use('/v1', routes);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(queryParser());
app.server.listen(config.port);

console.log(`Started on port ${app.server.address().port}`);

export default app;

import cors from 'cors';
import express from 'express';
import controller from './controllers/controller';

// options for cors middleware
const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

export const register = (app: express.Application) => {
  const router = express.Router();
  router.use(cors(options));

  router.post('/pdf', (req, res) => controller.convert(req, res));
  router.get('/status', (req, res) => controller.status(req, res));
  app.use('/', router);
};

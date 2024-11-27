import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './routes';
import { METHODS } from 'http';

const app = express();

// app.use(cors());

// Configure CORS
const corsOptions = {
  // origin: 'http://localhost:5173',
  origin: '*',
  // credentials: true,
  methods:['GET', 'PUSH', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api', router);

export default app;

import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getSpesimenController,
  getSpesimenByIdController,
  createSpesimenController,
} from '../controllers/spesimen.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getSpesimenController)
  .get('/:id', getSpesimenByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createSpesimenController);

const spesimenRoutes = Router();
spesimenRoutes.use(publicRoutes);
spesimenRoutes.use(protectedRoutes);

export default spesimenRoutes;
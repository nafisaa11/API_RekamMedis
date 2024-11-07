import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getLayananController,
  getLayananByIdController,
  createLayananController,
} from '../controllers/layanan.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getLayananController)
  .get('/:id', getLayananByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createLayananController);

const layananRoutes = Router();
layananRoutes.use(publicRoutes);
layananRoutes.use(protectedRoutes);

export default layananRoutes;

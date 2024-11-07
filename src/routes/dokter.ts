import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  createDokterController,
  getDoktersController
  // getDokterByIdController,
  // updateDokterController
} from '../controllers/dokter.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

protectedRoutes
  // .use(authenticateToken, authenticateUser)
  .get('/', getDoktersController)
  .post('/create', createDokterController)
  // .put('/update/:id', updateDokterController)

const dokterRoutes = Router();
dokterRoutes.use(publicRoutes);
dokterRoutes.use(protectedRoutes);

export default dokterRoutes;

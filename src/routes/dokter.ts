import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
// import { authenticateUser  } from '../middleware/authenticateUser ';

import {
  createDokterController,
  getDoktersController,
  deleteDokterController, // Pastikan ini diimpor
  updateDokterController
} from '../controllers/dokter.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

// Uncomment if you want to use authentication middleware
// protectedRoutes.use(authenticateToken, authenticateUser );

protectedRoutes
  .get('/', getDoktersController)
  .post('/create', createDokterController)
  .delete('/delete/:id', deleteDokterController)
  .put('/update/:id', updateDokterController);

const dokterRoutes = Router();
dokterRoutes.use(publicRoutes);
dokterRoutes.use(protectedRoutes);

export default dokterRoutes;
import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  createPasienController,
  // loginPasienController,
  getPasiensController,
  getPasienByIdController,
} from '../controllers/pasien.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

// publicRoutes.post('/login', loginPasienController);

protectedRoutes
  // .use(authenticateToken, authenticateUser)
  .get('/', getPasiensController)
  .get('/:id', getPasienByIdController)
  .post('/create', createPasienController);
  // .put('/update/:id', updatePasienController)
  // .delete('/delete/:id', deletePasienController);

const pasienRoutes = Router();
pasienRoutes.use(publicRoutes);
pasienRoutes.use(protectedRoutes);

export default pasienRoutes;

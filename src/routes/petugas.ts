import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  createPetugasController,
  loginPetugasController,
  getPetugasController,
  getPetugasByIdController,
  // updatePetugasController,
  // deletePetugasController,
} from '../controllers/petugas.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes.post('/login', loginPetugasController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .get('/', getPetugasController)
  .get('/:id', getPetugasByIdController)
  .post('/create', createPetugasController);
  // .put('/update/:id', updatePetugasController)
  // .delete('/delete/:id', deletePetugasController);

const petugasRoutes = Router();
petugasRoutes.use(publicRoutes);
petugasRoutes.use(protectedRoutes);

export default petugasRoutes;

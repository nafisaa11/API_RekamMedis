import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getScheduleController,
  createScheduleController,
} from '../controllers/schedule.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getScheduleController)
  .post('/create', createScheduleController);

// protectedRoutes
//   .use(authenticateToken, authenticateUser)
//   .post('/create', createCategoryController)
//   .put('/update/:id', updateCategoryController)
//   .delete('/delete/:id', deleteCategoryController);

const scheduleRoutes = Router();
scheduleRoutes.use(publicRoutes);
// scheduleRoutes.use(protectedRoutes);

export default scheduleRoutes;

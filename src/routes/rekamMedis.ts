import { Router } from 'express';
import { getRekamMedisController, 
          getRekamMedisByIdController, 
          createRekamMedisController
        } from '../controllers/rekamMedis.controller';

const rekamMedisRoutes = Router();

rekamMedisRoutes
  .get('/', getRekamMedisController)
  .get('/:id', getRekamMedisByIdController)
  .post('/create/:id', createRekamMedisController);

export default rekamMedisRoutes;

import { Router } from 'express';

import dokterRoutes from './dokter';
import pasienRoutes from './pasien';
import rekamMedisRoutes from './rekamMedis';

const router = Router();

router
  .use('/dokter', dokterRoutes)
  .use('/pasien', pasienRoutes)
  .use('/rekam-medis', rekamMedisRoutes);

export default router;

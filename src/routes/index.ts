import { Router } from 'express';

import adminRoutes from './admin';
import memberRoutes from './member';
import cateogryRoutes from './category';
import authorRoutes from './author';
import publisherRoutes from './publisher';
import shelfRoutes from './shelf';
import libraryProfileRoutes from './libraryProfile';
import bookRoutes from './book';
import bookDetailRoutes from './bookDetail';
import stockRoutes from './stock';
import borrowingRoutes from './borrowing';
import scheduleRoutes from './schedule';
import dokterRoutes from './dokter';
import pasienRoutes from './pasien';
import petugasRoutes from './petugas';
import layananRoutes from './layanan';
import pemeriksaanRoutes from './pemeriksaan';
import spesimenRoutes from './spesimen';
import rekamMedisRoutes from './rekamMedis';

const router = Router();

router
  .use('/admin', adminRoutes)
  .use('/member', memberRoutes)
  .use('/category', cateogryRoutes)
  .use('/author', authorRoutes)
  .use('/publisher', publisherRoutes)
  .use('/shelf', shelfRoutes)
  .use('/library-profile', libraryProfileRoutes)
  .use('/book', bookRoutes)
  .use('/book-detail', bookDetailRoutes)
  .use('/stock', stockRoutes)
  .use('/borrowing', borrowingRoutes)
  .use('/schedule', scheduleRoutes)
  .use('/dokter', dokterRoutes)
  .use('/pasien', pasienRoutes)
  .use('/petugas', petugasRoutes)
  .use('/layanan', layananRoutes)
  .use('/pemeriksaan', pemeriksaanRoutes)
  .use('/spesimen', spesimenRoutes)
  .use('/rekam-medis', rekamMedisRoutes);

export default router;

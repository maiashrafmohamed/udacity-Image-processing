import express from 'express';
import imageRoutes from './api/image';

const router = express.Router();

router.use('/image', imageRoutes);

export default router;

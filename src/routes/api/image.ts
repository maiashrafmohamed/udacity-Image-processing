import express from 'express';
import { resizeImage } from '../../services/image';
import imageValidation from '../../validators/image';

const router = express.Router();

router.get('/resize', imageValidation.image.resizeImage, resizeImage);

export default router;

import express from 'express';
import imageController from '../../controllers/image';
import imageValidation from '../../validators/image';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', imageValidation.resizeImage, imageController.resizeImage);

export default router;

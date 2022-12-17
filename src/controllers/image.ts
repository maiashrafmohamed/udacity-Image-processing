import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import fs from 'fs';
import Path from 'path';
import sharp from 'sharp';

/**
 * resizeImage this function is resized the image with the given width and height
 * @param req the request of api
 * @param res the response of api
 */
const resizeImage = async (req: Request, res: Response): Promise<any> => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  /**check if there's any errors from validator */
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const imageName = req.query.name;
  const imageWidth: number = Number(req.query.width);
  const imageHeight: number = Number(req.query.height);

  const imagePath: string = Path.join(
    __dirname,
    '../assets/images/' + imageName + '.jpg'
  );

  /**check if the image is exist if not exist throw error */
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const resizedImagePath: string = Path.join(
    __dirname,
    '../assets/images/resized-images/' +
      imageName +
      '-' +
      imageWidth +
      '-' +
      imageHeight +
      '.jpg'
  );
  /** check if the image resized before with the  given width and height */
  if (fs.existsSync(resizedImagePath)) {
    return res.sendFile(resizedImagePath);
  }
  /** The image is not resized with the given width and height before so here will resized by sharp */
  await sharp(imagePath)
    .resize({
      width: imageWidth,
      height: imageHeight
    })
    .toFile(resizedImagePath);

  res.sendFile(resizedImagePath);
};

export default {
  resizeImage
};

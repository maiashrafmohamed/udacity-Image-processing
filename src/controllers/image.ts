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
const resizeImage = async (req: Request, res: Response) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  /**check if there's any errors from validator */
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const imageName: string = req.query.name as string;
  const imageWidth: number = Number(req.query.width);
  const imageHeight: number = Number(req.query.height);

  const imagePath: string =
    Path.resolve('./') + `/assets/images/${imageName}.jpg`;

  /**check if the image is exist if not exist throw error */
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const resizedImagePath: string =
    Path.resolve('./') +
    `/assets/images/resized-images/${imageName}-${imageWidth}-${imageHeight}.jpg`;

  /** check if the image resized before with the  given width and height */
  if (fs.existsSync(resizedImagePath)) {
    return res.sendFile(resizedImagePath);
  }
  /** The image is not resized with the given width and height before so here will resized by sharp */
  resizeImagesBySharp(
    res,
    imagePath,
    imageWidth,
    imageHeight,
    resizedImagePath
  );

  res.sendFile(resizedImagePath);
};

/**
 * resizeImagesBySharp resize the image by sharp and cache it the in resized-images file with exact width and height
 * @param res the api response
 * @param imagePath the image path before resize
 * @param imageWidth the image width
 * @param imageHeight the image height
 * @param resizedImagePath the image path after resize
 */
const resizeImagesBySharp = async (
  res: Response,
  imagePath: string,
  imageWidth: number,
  imageHeight: number,
  resizedImagePath: string
) => {
  try {
    await sharp(imagePath)
      .resize({
        width: imageWidth,
        height: imageHeight
      })
      .toFile(resizedImagePath);
  } catch {
    return res.status(500).json({ error: 'failed to resize the image' });
  }
};

export default {
  resizeImage
};

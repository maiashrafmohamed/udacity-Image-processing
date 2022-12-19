import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import fs from 'fs';
import Path from 'path';
import { ImageResize } from '../models/image';
import sharp from 'sharp';

/**
 * resizeImage this function is the main functio to resize the image
 *  check the validation of param
 * return error is the params is not valid
 * if valid, then get the image full path
 * then check the path is exist
 * if not exist return error 404 image not found
 * then, get the resized image path with width and heigth
 * if path exist the image is cached the return if
 * else resize the image by sharp and return it
 * @param req the request of api
 * @param res the response of api
 */
const resizeImage = async (req: Request, res: Response) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  /**check if there's any errors from validator */
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const imageData: ImageResize = {
    name: req.query.name as string,
    width: Number(req.query.width),
    height: Number(req.query.height)
  };

  const imagePath = getAndCheckImagePath(imageData.name);

  /**check if the image is not exist throw error */
  if (!imagePath) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const resizedImagePath: string = getResizedImagePath(imageData);

  /** check if the image resized before with the  given width and height */
  if (fs.existsSync(resizedImagePath)) {
    return res.sendFile(resizedImagePath);
  }

  /** The image is not resized with the given width and height before so here will resized by sharp */
  await resizeImagesBySharp(res, imagePath, imageData, resizedImagePath);

  res.sendFile(resizedImagePath);
};

/**
 * getImagePath this function to get the image path
 * check if the image exist
 * if exist return the path
 * else return ''
 * @param imageName image name
 * @returns the image path string if exist
 */
const getAndCheckImagePath = (imageName: string): string => {
  const imagePath: string =
    Path.resolve('./') + `/assets/images/${imageName}.jpg`;
  return fs.existsSync(imagePath) ? imagePath : '';
};

/**
 * getResizedImagePath this function to get the resized image path
 * return the path with width and height
 * @param imageData image data name, width and height
 * @returns the image path string
 */
const getResizedImagePath = (imageData: ImageResize): string => {
  return (
    Path.resolve('./') +
    `/assets/images/resized-images/${imageData.name}-${imageData.width}-${imageData.height}.jpg`
  );
};

/**
 * resizeImagesBySharp resize the image by sharp
 * Cache it the in resized-images file with exact width and height
 *
 * @param res the api response
 * @param imagePath the image path before resize
 * @param imageData the image data name, width and height
 * @param resizedImagePath the image path after resize
 */
const resizeImagesBySharp = async (
  res: Response,
  imagePath: string,
  imageData: ImageResize,
  resizedImagePath: string
): Promise<any> => {
  try {
    await sharp(imagePath)
      .resize({
        width: imageData.width,
        height: imageData.height
      })
      .toFile(resizedImagePath);
  } catch {
    return res.status(500).json({ error: 'failed to resize the image' });
  }
};

export {
  resizeImage,
  resizeImagesBySharp,
  getResizedImagePath,
  getAndCheckImagePath
};

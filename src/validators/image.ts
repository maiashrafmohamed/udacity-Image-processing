import { query } from 'express-validator';

export default {
  resizeImage: [
    query('name')
      .exists()
      .withMessage('the image name is required')
      .isString()
      .withMessage('the name should be string'),

    query('width')
      .exists()
      .withMessage('image width is required')
      .isNumeric()
      .withMessage('The image width should be number'),

    query('height')
      .exists()
      .withMessage('image height is required')
      .isNumeric()
      .withMessage('The image height should be number')
  ]
};
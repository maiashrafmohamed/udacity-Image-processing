import { query } from 'express-validator';

export default {
  image: {
    resizeImage: [
      query('name')
        .exists()
        .withMessage('the image name is required'),

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
  }
};

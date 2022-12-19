import fs from 'fs';
import sharp from 'sharp';
import * as imageSrv from '../../services/image';
import { ImageResize } from '../../models/image';
import { Request, Response } from 'express';

describe('Image Service', () => {
  describe('resize Image', () => {
    jasmine.createSpy('sharp', () => () => ({
      resize: () => ({}),
      toFile: () => ({})
    }));
    let imageData: ImageResize = {
      name: 'sea',
      height: 500,
      width: 200
    };
    const response = ({
      sendFile: () => {
        return { end: () => {} };
      },
      status: () => {
        return {
          json: () => {
            return { end: () => {} };
          }
        };
      }
    } as unknown) as Response;

    let req = ({
      query: imageData
    } as unknown) as Request;

    it('get the image resize path when call getResizedImagePath', () => {
      const imageData: ImageResize = {
        name: 'sky',
        height: 500,
        width: 200
      };
      const path: string = imageSrv.getResizedImagePath(imageData);

      expect(path).toContain('images/resized-images/sky-200-500.jpg');
    });

    it('get the image path when call getAndCheckImagePath', () => {
      spyOn(fs, 'existsSync').and.returnValue(true);

      const imageData: ImageResize = {
        name: 'fjord',
        height: 500,
        width: 200
      };
      const path: string = imageSrv.getAndCheckImagePath(imageData.name);

      expect(fs.existsSync).toHaveBeenCalled();
      expect(path).toContain('images/fjord.jpg');
    });

    it('when the image path is not exist return empty path', () => {
      spyOn(fs, 'existsSync').and.returnValue(false);

      const imageData: ImageResize = {
        name: 'sea',
        height: 500,
        width: 200
      };
      const path: string = imageSrv.getAndCheckImagePath(imageData.name);
      expect(fs.existsSync).toHaveBeenCalled();

      expect(path).toBe('');
    });

    it('should return the resized cached image and not use resize by sharp ', () => {
      spyOn(response, 'sendFile').and.callThrough();
      spyOn(fs, 'existsSync').and.returnValue(true);
      spyOn(imageSrv, 'resizeImagesBySharp').and.callThrough();

      imageSrv.resizeImage(req, response);

      expect(response.sendFile).toHaveBeenCalled();
      expect(fs.existsSync).toHaveBeenCalled();
      expect(imageSrv.resizeImagesBySharp).not.toHaveBeenCalled();
    });
  });
});

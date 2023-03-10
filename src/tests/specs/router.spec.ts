import supertest from 'supertest';
import app from '../../app';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Resize Image endpoint', () => {
  it('When no query params passed to api then, the api shoud return status 400 with all errors', async () => {
    const response: supertest.Response = await request.get('/api/image/resize');
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual([
      'the image name is required',
      'image width is required',
      'The image width should be number',
      'image height is required',
      'The image height should be number'
    ]);
  });

  it('When the name query params is not exist then, the api shoud return status 400 with errors name is required', async () => {
    const response: supertest.Response = await request.get(
      '/api/image/resize?width=500&height=200'
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual(['the image name is required']);
  });

  it('When the width query params is not exist then, the api shoud return status 400 with errors width is required and shoud be number', async () => {
    const response = await request.get('/api/image/resize?name=sky&height=200');
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual([
      'image width is required',
      'The image width should be number'
    ]);
  });

  it('When the width query params value is not a number then, the api shoud return status 400 with errors width shoud be number', async () => {
    const response: supertest.Response = await request.get(
      '/api/image/resize?name=sky&width=xx&height=200'
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual(['The image width should be number']);
  });

  it('When the height query params is not exist then, the api shoud return status 400 with errors height is required and shoud be number', async () => {
    const response: supertest.Response = await request.get(
      '/api/image/resize?name=sky&width=200'
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual([
      'image height is required',
      'The image height should be number'
    ]);
  });

  it('When the height query params value is not a number then, the api shoud return status 400 with errors height shoud be number', async () => {
    const response: supertest.Response = await request.get(
      '/api/image/resize?name=sky&width=500&height=xx'
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual(['The image height should be number']);
  });

  it('When the image is not on the server, then shoud return status 404 with error image not found', async () => {
    const response: supertest.Response = await request.get(
      '/api/image/resize?name=sky&height=200&width=200'
    );
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Image not found');
  });

  it('When the image is param is valid, then shoud return status 200', async () => {
    const response: supertest.Response = await request.get(
      '/api/image/resize?name=fjord&width=500&height=800'
    );
    expect(response.status).toBe(200);
  });
});

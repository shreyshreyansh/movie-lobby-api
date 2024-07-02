import mongoose from 'mongoose';
import app from '../src/app';
import request from 'supertest';

let initMovieId: string;
beforeAll(async () => {
  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

  const res = await request(app)
    .post('/api/movies')
    .send({
      title: 'Avengers',
      genre: 'Action',
      rating: 9.7,
      streamingLink: 'http://example.com/avengers',
    })
    .set('Accept', 'application/json');
  initMovieId = res.body._id;
});

afterAll(async () => {
  initMovieId && (await request(app).delete(`/api/movies/${initMovieId}`));
  await mongoose.connection.close();
});

describe('Movie API', () => {
  let movieId: string;

  it('should list all movies', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should add a new movie', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({
        title: 'Inception',
        genre: 'Sci-Fi',
        rating: 8.8,
        streamingLink: 'http://example.com/inception',
      })
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    movieId = res.body._id;
  });

  it('should search for movies by title or genre', async () => {
    const res = await request(app).get('/api/movies/search?q=act');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update an existing movie', async () => {
    const res = await request(app)
      .patch(`/api/movies/${movieId}`)
      .send({
        title: 'Inception Updated',
        genre: 'Sci-Fi',
        rating: 9.0,
        streamingLink: 'http://example.com/inception-updated',
      })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Inception Updated');
  });

  it('should delete a movie', async () => {
    const res = await request(app).delete(`/api/movies/${movieId}`);
    expect(res.status).toBe(200);
    expect(res.text).toBe('Movie deleted');
  });
});

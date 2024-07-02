import { Request, Response } from 'express';
import Movie from '../models/movie';

// List all movies
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Search for a movie by title or genre
export const searchMovies = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Add a new movie
export const addMovie = async (req: Request, res: Response) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update a movie
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a movie
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.send('Movie deleted');
  } catch (err) {
    res.status(500).send(err);
  }
};

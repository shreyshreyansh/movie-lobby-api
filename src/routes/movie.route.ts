import { Router } from 'express';
import {
  getMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/movie.controller';
import { adminAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/movies', getMovies);
router.post('/movies', adminAuth, addMovie);
router.get('/movies/search', searchMovies);
router.patch('/movies/:id', adminAuth, updateMovie);
router.delete('/movies/:id', adminAuth, deleteMovie);

export default router;

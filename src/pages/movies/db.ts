import { GENRES, PAGE_SIZE } from './constants';
import { faker } from '@faker-js/faker';
import type { Movie, State } from './types';
import { paginate } from './utils';
import { render } from '.';
export let state: State = {
  currentGenre: 'All',
  currentPage: 1,
  search: '',
  movies: [
    {
      id: 'vMXhj',
      title: 'The Arc of a Scythe',
      genre: 'Action',
      rate: 8.3,
      stock: 135
    },
    {
      id: 'Ih7TZ',
      title: 'His Dark Materials',
      genre: 'Thriller',
      rate: 5.9,
      stock: 139
    },
    {
      id: 'WJL27',
      title: 'The Southern Reach',
      genre: 'Thriller',
      rate: 4.5,
      stock: 66
    },
    {
      id: 'y4S1O',
      title: 'The Dresden Files',
      genre: 'Thriller',
      rate: 8.6,
      stock: 7
    },
    {
      id: 'dgUi7',
      title: 'Hercule Poirot',
      genre: 'Comedy',
      rate: 5.3,
      stock: 170
    },
    {
      id: 'De4tq',
      title: 'The Infinity Cycle',
      genre: 'Thriller',
      rate: 2.8,
      stock: 131
    },
    {
      id: 'lqSH6',
      title: 'The Eighth Life',
      genre: 'Comedy',
      rate: 7.5,
      stock: 106
    },
    {
      id: 'ifByf',
      title: 'The Dark Tower',
      genre: 'Comedy',
      rate: 5.1,
      stock: 47
    },
    {
      id: 'Ja8nv',
      title: 'The Prison Healer',
      genre: 'Thriller',
      rate: 3.3,
      stock: 196
    },
    {
      id: 'TOTwb',
      title: 'Discworld',
      genre: 'Comedy',
      rate: 6.2,
      stock: 172
    },
    {
      id: 'dxoGm',
      title: 'The Prison Healer',
      genre: 'Thriller',
      rate: 4.2,
      stock: 189
    },
    {
      id: 'aVvcv',
      title: 'His Dark Materials',
      genre: 'Thriller',
      rate: 2.1,
      stock: 196
    },
    {
      id: 'sBg3S',
      title: 'War and Peace',
      genre: 'Action',
      rate: 4.4,
      stock: 173
    }
  ]
};

export function getMovies() {
  const { movies, currentGenre, search, currentPage } = state;

  // Genre filter
  const filteredMovies: Movie[] = currentGenre !== 'All' ? movies.filter(m => m.genre === currentGenre) : movies;

  // Search filter
  const searchedMovies: Movie[] = search
    ? filteredMovies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    : filteredMovies;

  const paginatedMovies: Movie[] = paginate(searchedMovies, currentPage, PAGE_SIZE);

  return { movies: paginatedMovies, total: searchedMovies.length };
}

export function addMovie(movie: Omit<Movie, 'id'>) {
  const movies = [...state.movies];
  const newMovie = { id: faker.string.nanoid(5), ...movie };
  movies.push(newMovie);

  setState({ movies });
}

export function updateMovie(movieId: string, movie: Partial<Omit<Movie, 'id'>>) {
  const movies = [...state.movies];
  const updateIdx = movies.findIndex(m => m.id === movieId);
  movies[updateIdx] = { ...movies[updateIdx], ...movie };

  setState({ movies });
}

export function deleteMovie(movieId: string) {
  const movies = [...state.movies];
  const deleteIdx = movies.findIndex(m => m.id === movieId);
  movies.splice(deleteIdx, 1);

  setState({ movies });
}

export function setState(newState: Partial<State>) {
  state = { ...state, ...newState };

  render();
}

function generateMovie(): Movie {
  const genre = GENRES[faker.number.int({ min: 0, max: GENRES.length - 1 })];
  const movie: Movie = {
    id: faker.string.nanoid(5),
    title: faker.book.series(),
    genre,
    rate: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
    stock: faker.number.int({ min: 1, max: 200 })
  };

  return movie;
}

// CRUD operations (CREATE , READ ✅, UPDATE, DELETE)

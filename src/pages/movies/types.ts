export type Genre = 'All' | 'Comedy' | 'Action' | 'Thriller';

export interface Movie {
  id: string;
  title: string;
  genre: Genre;
  rate: number;
  stock: number;
}

export interface State {
  currentGenre: Genre;
  currentPage: number;
  search: string;
  movies: Movie[];
}

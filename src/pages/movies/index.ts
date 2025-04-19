import { GENRES, PAGE_SIZE } from './constants';
import { deleteMovie, getMovies, setState, state } from './db';
import type { Genre } from './types';

// HANDLE FUNCTIONS
function handleSelectGenre(event: MouseEvent) {
  const btn = event.target as HTMLButtonElement;
  const currentGenre = btn.dataset.value! as Genre;
  setState({ currentGenre, currentPage: 1 });
}

function handleChangePage(event: MouseEvent) {
  const pageLink = event.target as HTMLAnchorElement;
  const currentPage = +pageLink.dataset.value!;
  setState({ currentPage });
}

function handleChangeSearch(event: Event) {
  const input = event.target as HTMLInputElement;
  const search = input.value;
  setState({ search, currentPage: 1 });
}

function handleDelete(event: MouseEvent) {
  const btn = event.target as HTMLButtonElement;
  const movieId = btn.dataset.value!;

  deleteMovie(movieId);
}

// UI FUNCTIONS
export function renderInitHTML() {
  const pageWrapper: HTMLDivElement = document.querySelector('.page-wrapper')!;

  pageWrapper.innerHTML = `<div class="container mt-[32px]">
        <div class="row">
          <div class="col-2">
            <ul class="list-group" id="genres-wrapper"></ul>
          </div>
          <div class="col">
            <button class="btn btn-primary mb-[20px]" id="new-movie-btn">New Movie</button>
            <p class="m-0" id="movies-count">Showing 10 movies in the database.</p>
            <input type="text" name="query" class="form-control my-3" placeholder="Search..." id="search-input" />
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <ul class="pagination" id="pagination-wrapper"></ul>
          </div>
        </div>
      </div>`;
}

export function render() {
  renderGenres();
  renderMovies();
  renderPagination();
}

function renderGenres() {
  const genresWrapper: HTMLUListElement = document.querySelector('#genres-wrapper')!;
  const fragment = document.createDocumentFragment();

  for (const genre of GENRES) {
    const genreElement = document.createElement('li');
    genreElement.dataset.value = genre;
    genreElement.textContent = genre;
    genreElement.className = 'list-group-item cursor-pointer';
    if (genre === state.currentGenre) genreElement.classList.add('active');

    genreElement.addEventListener('click', handleSelectGenre);

    fragment.append(genreElement);
  }

  genresWrapper.replaceChildren(fragment);
}

function renderMovies() {
  const tableBody: HTMLTableSectionElement = document.querySelector('tbody')!;
  const moviesCountElm: HTMLParagraphElement = document.querySelector('#movies-count')!;

  const { movies, total } = getMovies();
  const fragment = document.createDocumentFragment();

  moviesCountElm.textContent = `Showing ${total} movies in the database.`;
  for (const movie of movies) {
    const tableRow = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = movie.title;

    const genreCell = document.createElement('td');
    genreCell.textContent = movie.genre;

    const stockCell = document.createElement('td');
    stockCell.textContent = movie.stock.toString();

    const rateCell = document.createElement('td');
    rateCell.textContent = movie.rate.toString();

    const actionsCell = document.createElement('td');
    actionsCell.className = 'flex gap-2';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'btn btn-primary btn-sm';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.dataset.value = movie.id;
    deleteBtn.addEventListener('click', handleDelete);

    actionsCell.append(editBtn, deleteBtn);

    tableRow.append(titleCell, genreCell, stockCell, rateCell, actionsCell);

    fragment.append(tableRow);
  }

  tableBody.replaceChildren(fragment);
}

function renderPagination() {
  const paginationWrapper: HTMLUListElement = document.querySelector('#pagination-wrapper')!;

  const { total } = getMovies();
  const maxPage = Math.ceil(total / PAGE_SIZE);
  if (maxPage <= 1) {
    paginationWrapper.innerHTML = '';
    return;
  }

  const fragment = document.createDocumentFragment();

  for (let page = 1; page <= maxPage; page++) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item cursor-pointer';

    if (page === state.currentPage) pageItem.classList.add('active');

    const pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    pageLink.textContent = page.toString();
    pageLink.dataset.value = page.toString();
    pageLink.addEventListener('click', handleChangePage);

    pageItem.append(pageLink);
    fragment.append(pageItem);
  }

  paginationWrapper.replaceChildren(fragment);
}

// LOGIC Functions
function addListeners() {
  const newMovieBtn: HTMLButtonElement = document.querySelector('#new-movie-btn')!;
  const searchInput: HTMLInputElement = document.querySelector('#search-input')!;

  searchInput.addEventListener('input', handleChangeSearch);
}

export function moviesInit() {
  renderInitHTML();

  render();
  addListeners();
}

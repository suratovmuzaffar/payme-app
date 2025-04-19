import type { Movie } from './types';

export function paginate(items: Movie[], currentPage: number, pageSize: number) {
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;

  return items.slice(startIdx, endIdx);
}

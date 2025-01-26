import axios from 'axios';

export const searchPixabay = (searchQuery, currentPage) => {
  const searchParams = new URLSearchParams({
    key: '529440-adfab00ac2bbbc69c0a669d95',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: '15',
  });

  return axios.get(`https://pixabay.com/api/?${searchParams}`);
};

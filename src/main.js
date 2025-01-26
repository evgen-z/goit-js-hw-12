import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchPixabay } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-button');

let lightbox;
let currentPage = 1;

loader.style.display = 'none';
loadMoreBtn.style.display = 'none';

const searchSubmit = async event => {
  try {
    event.preventDefault();

    const searchQuery = event.currentTarget.elements.query.value.trim();

    gallery.innerHTML = '';

    if (searchQuery === '') {
      iziToast.warning({
        title: 'Warning',
        message: 'Search field cannot be empty!',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FAFAFB',
        titleColor: '#FAFAFB',
        iconColor: '#FAFAFB',
      });
      return;
    }
    loader.style.display = 'block';

    const { data } = await searchPixabay(searchQuery, currentPage);

    if (data.total === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FAFAFB',
        iconColor: '#FAFAFB',
      });

      gallery.innerHTML = '';
      loader.style.display = 'none';
      searchForm.reset();

      return;
    }

    gallery.innerHTML = renderGallery(data.hits);
    loadMoreBtn.style.display = 'block';

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a');
    } else {
      lightbox.refresh();
    }
    loader.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};

searchForm.addEventListener('submit', searchSubmit);

const loadMoreClick = async () => {
  const query = searchForm.elements.query.value.trim();
  try {
    currentPage++;

    const { data } = await searchPixabay(query, currentPage);

    if (currentPage * 15 >= data.totalHits) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FAFAFB',
        iconColor: '#FAFAFB',
      });

      loadMoreBtn.style.display = 'none';

      loadMoreBtn.removeEventListener('click', loadMoreClick);

      return;
    }

    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));

    scroll();
  } catch (err) {
    console.log(err);
  }
};

loadMoreBtn.addEventListener('click', loadMoreClick);

const scroll = () => {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

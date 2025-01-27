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
let searchQuery = '';

loader.style.display = 'none';
loadMoreBtn.style.display = 'none';

const searchSubmit = async event => {
  try {
    event.preventDefault();

    searchQuery = event.currentTarget.elements.query.value.trim();

    gallery.innerHTML = '';

    currentPage = 1;

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
    loadMoreBtn.style.display = 'none';
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
      loadMoreBtn.style.display = 'none';
      searchForm.reset();

      return;
    }

    if (data.totalHits > 15) {
      loadMoreBtn.style.display = 'block';
    loadMoreBtn.addEventListener('click', loadMoreClick);
    }

    gallery.innerHTML = renderGallery(data.hits);
    

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
  
  try {
    currentPage++;

    const { data } = await searchPixabay(searchQuery, currentPage);

    

    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
    lightbox.refresh();
    scroll();
    if (currentPage * 15 >= data.totalHits) {
      iziToast.info({
        title: '',
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
  } catch (err) {
    console.log(err);
  }
};



const scroll = () => {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

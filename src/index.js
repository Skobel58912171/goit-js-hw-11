import './css/styles.css';
import getRefs from './refs';
import renderGalery from './renderMarkup';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './ImagesApiService';
import renderGalery from './renderMarkup';

// console.log(getRefs().loadBtn);
// console.log(getRefs().searchForm);
// console.log(getRefs().galleryBox);

getRefs().searchForm.addEventListener('submit', onSearch);
getRefs().loadBtn.addEventListener('click', onLoad);

const imagesApiService = new ImagesApiService();
let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearch(e) {
  e.preventDefault();
  clearGallery();

  getRefs().loadBtn.classList.add('is-hidden');

  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (!imagesApiService.query) {
    Notify.info('Enter data to search!');
    return;
  }

  imagesApiService
    .fetchGallery()
    .then(data => {
      console.log(imagesApiService.page);

      getRefs().loadBtn.classList.remove('is-hidden');
      imagesApiService.incrementPage();
      if (!data.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        Notify.success(`"Hooray! We found ${data.totalHits} images."`);
      }
      renderGalery(data.hits);
      if (imagesApiService.page >= 1) {
        smoothScroll();
      }

      gallery.refresh();

      if (
        imagesApiService.page ===
        Math.ceil(data.totalHits / imagesApiService.per_page)
      ) {
        getRefs().loadBtn.classList.add('is-hidden');
        Notify.info(
          `We are sorry, but you have reached the end of search results.`
        );
      }
    })
    .catch(error => {
      console.log('Error');
    });
}

function clearGallery() {
  getRefs().galleryBox.innerHTML = '';
}

function onLoad(e) {
  imagesApiService
    .fetchGallery()
    .then(data => {
      console.log(imagesApiService.page);
      getRefs().loadBtn.classList.remove('is-hidden');
      imagesApiService.incrementPage();
      if (!data.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        Notify.success(`"Hooray! We found ${data.totalHits} images."`);
      }
      renderGalery(data.hits);
      if (imagesApiService.page >= 1) {
        smoothScroll();
      }

      gallery.refresh();

      if (
        imagesApiService.page ===
        Math.ceil(data.totalHits / imagesApiService.per_page)
      ) {
        getRefs().loadBtn.classList.add('is-hidden');
        Notify.info(
          `We are sorry, but you have reached the end of search results.`
        );
      }
    })
   function smoothScroll() {
  const { height: cardHeight } =
    getRefs().galleryBox.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
    });
}

function smoothScroll() {
  const { height: cardHeight } =
    getRefs().galleryBox.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

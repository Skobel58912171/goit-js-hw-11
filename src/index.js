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
let countImages = 0;
function onSearch(e) {
  e.preventDefault();
  clearGallery();
  getRefs().loadBtn.classList.add('is-hidden');

  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  countImages = 0;

  imagesApiService.resetPage();

  if (!imagesApiService.query) {
    Notify.info('Enter data to search!');
    return;
  }
  fetchGallery();
}

function clearGallery() {
  getRefs().galleryBox.innerHTML = '';
}

function onLoad(e) {
  fetchGallery();
}
async function fetchGallery() {
  try {
    const data = await imagesApiService.fetchGallery();
    // console.log(imagesApiService.page);
    getRefs().loadBtn.classList.remove('is-hidden');
    imagesApiService.incrementPage();
    countImages += data.hits.length;
    // console.log(countImages);
    if (!data.hits.length) {
      getRefs().loadBtn.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderGalery(data.hits);
    gallery.refresh();
    if (
      imagesApiService.page ===
      Math.ceil(data.totalHits / imagesApiService.per_page)
    ) {
      Notify.info(
        `We are sorry, but you have reached the end of search results.`
      );
      getRefs().loadBtn.classList.add('is-hidden');
    }

    if (countImages === data.hits.length) {
      Notify.success(`"Hooray! We found ${data.totalHits} images."`);
    }
    if (countImages > data.hits.length) {
      smoothScroll();
    }
  } catch (error) {
    console.log('Error');
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    getRefs().galleryBox.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

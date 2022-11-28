import './css/styles.css';
import getRefs from './refs';
import renderGalery from './renderMarkup';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './NewsApiService';
import renderGalery from './renderMarkup';

// console.log(getRefs().loadMoreBtn);
// console.log(getRefs().searchForm);
// console.log(getRefs().galleryBox);
getRefs().searchForm.addEventListener('submit', onSearch);
// getRefs().loadMoreBtn.addEventListener('click'.onClick);

const newsApiService = new NewsApiService();

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.searchQuery.value;
  console.log(newsApiService.query);
  newsApiService.resetPage();
  newsApiService
    .fetchGallery()
    .then(result => {
      console.log(result);
      return result.data;
    })
    .then(data => {
      clearGallery();
      renderGalery(data.hits);
    });
}

function clearGallery() {
  getRefs().galleryBox.innerHTML = '';
}

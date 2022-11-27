import './css/styles.css';
import getRefs from './refs';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './NewsApiService';
// const refs = {
//   searchForm: document.querySelector('.search-form'),
//   galleryBox: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

getRefs().searchForm.addEventListener('submit', onSearch);
// getRefs().loadMoreBtn.addEventListener('click'.onClick);
// const url = `${BASE_URL}?key=31597784-263cd57eb2ec667d9660f1eac&q=${searchQueryName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
// function ringsApi(page = 1) {
//   return fetch(url).then(responce => {
//     if (!responce.ok) {
//       throw new Error();
//     }
//     console.log(responce);
//     return responce.json();
//   });
// }
const newsApiService = new NewsApiService();

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.searchQuery.value;
  console.log(newsApiService.query);
  newsApiService.resetPage();
  newsApiService
    .fetchGallery()
    .then(result => {
      console.log(result.data);
      return result.data;
    })
    .then(data => {
      console.log(data.hits);
      return data.hits;
    })
    .then(hits => {
      console.log(hits);
      // renderGalery(hits);
    });
}

// ringsApi()
//   .then(data => {
//     console.log(data.hits);
//     incrementPage();
//     return data.hits;
//   })
//   .then(hits => {
//     clearGallery();
//     renderGalery(hits);
//   });
// .catch(err => console.log(error));
// createMarkupGallery(hits);

function createMarkupGallery(hits) {
  return hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes <span>${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views <span>${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments <span>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads <span>${downloads}</span></b>
    </p>
  </div>
</div>`
    )
    .join();
  console.log(f);
}

// function renderGalery(images) {
//   getRefs().galleryBox.insertAdjacentHTML(
//     'afterbegin',
//     createMarkupGallery(images)
//   );
// }
// function clearGallery() {
//   getRefs().galleryBox.innerHTML = '';
// }

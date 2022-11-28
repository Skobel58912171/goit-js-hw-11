import getRefs from './refs';
function createMarkupGallery(arrImages) {
  return arrImages
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => `<div class="photo-card"><a class="photo-card__item" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
    .join('');
}

export default function renderGalery(arrImages) {
  getRefs().galleryBox.insertAdjacentHTML(
    'beforeend',
    createMarkupGallery(arrImages)
  );
}

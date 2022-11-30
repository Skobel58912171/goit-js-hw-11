import axios, { Axios } from 'axios';
const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '31597784-263cd57eb2ec667d9660f1eac';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchGallery() {
    // console.log('до', this);
    const response = await axios.get(
      `${BASE_URL}${searchParams}&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}`
    );
    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

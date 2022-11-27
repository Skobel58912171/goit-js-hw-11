import axios, { Axios } from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQueryName = '';
    this.page = 1;
    this.gueryParametrs =
      'image_type=photo&orientation=horizontal&safesearch=true';
    this.pagination = `page=${this.page}&per_page=40`;
    this.configuration = {
      baseURL: 'https://pixabay.com/api/',
    };
    this.API_KEY = '31597784-263cd57eb2ec667d9660f1eac';

    this.instance = axios.create(this.configuration);
  }
  async fetchGallery() {
    const response = await this.instance.get(
      `?key=${this.API_KEY}&q=${this.searchQueryName}&${this.gueryParametrs}&${this.pagination}`
    );

    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQueryName;
  }
  set query(newQuery) {
    this.searchQueryName = newQuery;
  }
}

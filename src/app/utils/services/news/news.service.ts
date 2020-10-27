import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','news');
  }

  async detailsAsync(values) {
    return await this._apiFetchService.requestAsync('POST','news-find',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','news',values,true);
  }
}

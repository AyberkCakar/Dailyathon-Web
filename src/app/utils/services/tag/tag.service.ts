import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','category-tag',null,true);
  }

  async findAsync(values) {
    return await this._apiFetchService.requestAsync('POST','tag-find',values,true);
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','tag',values,true);
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync('PUT','tag',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','tag',values,true);
  }
}

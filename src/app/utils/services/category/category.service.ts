import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

async listAsync() {
    return await this._apiFetchService.requestAsync('GET','category',null,true);
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','category',values,true);
  }

  async findAsync(values) {
    return await this._apiFetchService.requestAsync('POST','category-find',values,true);
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync('PUT','category',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','category',values,true);
  }
}

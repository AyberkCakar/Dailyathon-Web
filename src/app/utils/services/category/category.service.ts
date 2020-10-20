import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

async listAsync() {
    return await this._apiFetchService.requestAsync('GET','category');
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','category',values,true);
  }
}

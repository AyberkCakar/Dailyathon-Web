import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

async listAsync() {
    return await this._apiFetchService.requestAsync('GET','category-tag');
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','tag',values,true);
  }
}

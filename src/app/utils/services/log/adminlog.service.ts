import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class AdminlogService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','adminlog',null,true);
  }

  async logClearAsync() {
    return await this._apiFetchService.requestAsync('DELETE','adminlog',null,true);
  }

}

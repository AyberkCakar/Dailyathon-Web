import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class DatabotlogService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','databotlog',null,true);
  }

  async logClearAsync() {
    return await this._apiFetchService.requestAsync('DELETE','databotlog',null,true);
  }
}

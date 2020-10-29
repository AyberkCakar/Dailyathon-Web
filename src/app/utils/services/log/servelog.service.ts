import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class ServelogService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','servelog',null,true);
  }

  async logClearAsync() {
    return await this._apiFetchService.requestAsync('DELETE','servelog',null,true);
  }
}

import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','entertainment');
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','entertainment',values,true);
  }

  async detailsAsync(values) {
    return await this._apiFetchService.requestAsync('POST','entertainment-find',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','entertainment',values,true);
  }
}

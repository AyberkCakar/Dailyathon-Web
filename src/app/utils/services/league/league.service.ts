import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','league');
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','league',values,true);
  }

  async findAsync(values) {
    return await this._apiFetchService.requestAsync('POST','league-find',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','league',values,true);
  }

}

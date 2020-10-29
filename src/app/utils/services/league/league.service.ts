import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','league',null,true);
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','league',values,true);
  }

  async findAsync(values) {
    return await this._apiFetchService.requestAsync('POST','league-find',values,true);
  }

  async scoreAsync(values) {
    return await this._apiFetchService.requestAsync('POST','standings-find',values,true);
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync('PUT','league',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','league',values,true);
  }

}

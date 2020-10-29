import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

async listAsync() {
    return await this._apiFetchService.requestAsync('GET','announcement',null,true);
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','announcement',values,true);
  }

  async findAsync(values) {
    return await this._apiFetchService.requestAsync('POST','announcement-find',values,true);
  }

  async statisticAsync(values) {
    return await this._apiFetchService.requestAsync('POST','announcement-statistic',values,true);
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync('PUT','announcement',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','announcement',values,true);
  }
}

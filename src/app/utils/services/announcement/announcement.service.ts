import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

async listAsync() {
    return await this._apiFetchService.requestAsync('GET','announcement');
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','announcement',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','announcement',values,true);
  }

}

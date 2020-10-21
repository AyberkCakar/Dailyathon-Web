import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

async listAsync() {
    return await this._apiFetchService.requestAsync('GET','admin');
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','sign-up/admin',values);
  }
}

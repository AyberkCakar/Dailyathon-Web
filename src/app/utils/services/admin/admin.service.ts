import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

async listAsync() {
    return await this._apiFetchService.requestAsync('GET','admin',null,true);
  }

  async findAsync(values) {
    return await this._apiFetchService.requestAsync('POST','find/admin',values,true);
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','sign-up/admin',values);
  }
}

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

}

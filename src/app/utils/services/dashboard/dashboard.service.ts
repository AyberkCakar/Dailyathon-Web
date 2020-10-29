import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async dashboardAsync() {
    return await this._apiFetchService.requestAsync('GET','dashboard',null,true);
  }
  async thisweekTagAsync() {
    return await this._apiFetchService.requestAsync('GET','thisweektag',null,true);
  }
}

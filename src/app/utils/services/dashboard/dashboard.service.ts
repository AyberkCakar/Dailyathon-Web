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
  async tagStatisticAsync(values) {
    return await this._apiFetchService.requestAsync('POST','tag-statistic',values,true);
  }
}

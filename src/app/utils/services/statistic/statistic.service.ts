import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async ageStatisticAsync() {
    return await this._apiFetchService.requestAsync('GET','age-statistic',null,true);
  }
  async categoryStatisticAsync(values) {
    return await this._apiFetchService.requestAsync('POST','category-statistic',values,true);
  }
}

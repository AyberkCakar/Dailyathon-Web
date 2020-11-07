import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

async listAsync() {
    return await this._apiFetchService.requestAsync('GET','survey',null,true);
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','survey',values,true);
  }

  async statisticAsync(values) {
    return await this._apiFetchService.requestAsync('POST','survey-statistic',values,true);
  }

  async datatableAsync(values) {
    return await this._apiFetchService.requestAsync('POST','survey-data',values,true);
  }

  async findAsync(values) {
    return await this._apiFetchService.requestAsync('POST','survey-find',values,true);
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync('PUT','survey',values,true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync('DELETE','survey',values,true);
  }
}

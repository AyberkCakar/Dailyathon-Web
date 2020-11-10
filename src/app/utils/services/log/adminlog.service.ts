import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import {LogModel} from '../../../pages/log/log.model';


@Injectable({
  providedIn: 'root',
})
export class AdminlogService {
  date: Date = new Date();
  log: LogModel = new LogModel();
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async createLogAsync(message:string,operations:string,isSuccess:number)
  {
    this.log={'AdminID': +localStorage.getItem('AdminID'), 'RegDate':this.date,'message':message,'Operation':operations,'isSuccess':isSuccess}
    await this.insertAsync(this.log);
  }
  async listAsync() {
    return await this._apiFetchService.requestAsync('GET','adminlog',null,true);
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync('POST','adminlog',values,true);
  }

  async logClearAsync() {
    return await this._apiFetchService.requestAsync('DELETE','adminlog',null,true);
  }

}

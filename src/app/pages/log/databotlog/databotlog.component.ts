import { Component } from '@angular/core';
import {DatabotlogModel} from './databotlog.model';
import {DatabotlogService} from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'databotlog',
  templateUrl: './databotlog.component.html'
})

export class DatabotlogComponent {
  model:Array<DatabotlogModel>;
  constructor(private router: Router, private _databotlogService: DatabotlogService )
  {}

  async ngOnInit(){
    try {
      this.model = <Array<DatabotlogModel>>await this._databotlogService.listAsync()
    } catch (error) {

    }
  };

  async logClear(){
    try {
      await this._databotlogService.logClearAsync()
      await this.ngOnInit();
    }catch (error) {
    }
  }
}

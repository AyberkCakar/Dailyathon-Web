import { Component } from '@angular/core';
import {AdminlogModel} from './adminlog.model';
import {AdminlogService} from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'adminlog',
  templateUrl: './adminlog.component.html'
})

export class AdminlogComponent {
  model:Array<AdminlogModel>;
  constructor(private router: Router, private _adminlogService: AdminlogService )
  {}

  async ngOnInit(){
    try {
      this.model = <Array<AdminlogModel>>await this._adminlogService.listAsync()

    } catch (error) {

    }
  };

  async logClear(){
    try {
      await this._adminlogService.logClearAsync()
      await this.ngOnInit();
    }catch (error) {
    }
  }
}

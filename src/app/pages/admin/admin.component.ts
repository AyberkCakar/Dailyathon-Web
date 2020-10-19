import { Component } from '@angular/core';
import {AdminModel} from './admin.model';
import { AdminService } from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent {

  model:Array<AdminModel>;
  constructor(private router: Router, private _userService: AdminService )
  {
  }
  
  async ngOnInit(){
    try {
      this.model = <Array<AdminModel>>await this._userService.listAsync()
      
    } catch (error) {
      
    }
  }
}

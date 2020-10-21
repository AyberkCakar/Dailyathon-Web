import { Component } from '@angular/core';
import {AdminModel} from '../admin.model';
import { AdminService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-add',
  templateUrl: './admin-add.component.html'
})

export class AdminAddComponent {
  date: Date = new Date();
  model: AdminModel = new AdminModel();
  constructor(private router: Router, private _adminService: AdminService )
  {
  }

  async ngOnInit(){
  }

  async adminAdd(username: string ,password: string, name: string, auth: string, position: string)
  {
    this.model.Username = username;
    this.model.Password = password;
    this.model.AdminName = name;
    this.model.AdminAuth = auth;
    this.model.AdminPosition = position;
    this.model.RegDate = this.date;
    try {
      await this._adminService.insertAsync(this.model);
      await this.router.navigateByUrl('/admin');
    } catch (error) {
    }
  }
}

import { Component } from '@angular/core';
import {AdminModel} from '../admin.model';
import { AdminService } from '../../../utils/services';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-update',
  templateUrl: './admin-update.component.html'
})

export class AdminUpdateComponent {
  model: AdminModel = new AdminModel();
  admin: AdminModel = new AdminModel();
  constructor(private router: Router, private _adminService: AdminService , private _router: ActivatedRoute)
  {}

  async ngOnInit(){
    try {
      this.admin.AdminID = +this._router.snapshot.paramMap.get('id');
      this.model = <AdminModel>await this._adminService.findAsync(this.admin);
    }
    catch (e) {
    }
  }

  async adminUpdate(id: number, name: string, auth: string, position: string)
  {
    this.admin.AdminID = id;
    this.admin.AdminName = name;
    this.admin.AdminAuth = auth;
    this.admin.AdminPosition = position;
    try {
      console.log(this.model);

      var response = await this._adminService.updateAsync(this.admin);
      console.log(response);
      await this.router.navigateByUrl('/admin');
    } catch (error) {
      console.log(error);

    }
  }
}

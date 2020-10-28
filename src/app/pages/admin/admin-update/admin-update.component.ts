import { Component } from '@angular/core';
import {AdminModel} from '../admin.model';
import { AdminService } from '../../../utils/services';
import { Router, ActivatedRoute } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'admin-update',
  templateUrl: './admin-update.component.html'
})

export class AdminUpdateComponent {
  model: AdminModel = new AdminModel();
  admin: AdminModel = new AdminModel();
  constructor(private router: Router, private _adminService: AdminService , private _router: ActivatedRoute , private notifier: NotifierService)
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.admin.AdminID = +this._router.snapshot.paramMap.get('id');
      this.model = <AdminModel>await this._adminService.findAsync(this.admin);
    }
    catch (error) {
      this.showNotification( 'error', error.message );
    }
  }

  async adminUpdate(id: number, name: string, auth: string, position: string)
  {
    this.admin.AdminID = id;
    this.admin.AdminName = name;
    this.admin.AdminAuth = auth;
    this.admin.AdminPosition = position;
    try {
      await this._adminService.updateAsync(this.admin);
      await this.router.navigateByUrl('/admin');
    } catch (error) {
      this.showNotification( 'error', error.message );
    }
  }
}

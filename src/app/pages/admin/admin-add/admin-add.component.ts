import {Component} from '@angular/core';
import {AdminModel} from '../admin.model';
import { AdminService,AdminlogService } from '../../../utils/services';
import { Router} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import {LogModel} from '../../log/log.model';

@Component({
  selector: 'admin-add',
  templateUrl: './admin-add.component.html'
})

export class AdminAddComponent {
  date: Date = new Date();
  model: AdminModel = new AdminModel();
  constructor(
    private router: Router, 
    private _adminService: AdminService , 
    private notifier: NotifierService,
    private _logService: AdminlogService
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
  }

  async adminAdd(username: string , password: string, name: string, auth: string, position: string)
  {
    this.model.Username = username;
    this.model.Password = password;
    this.model.AdminName = name;
    this.model.AdminAuth = auth;
    this.model.AdminPosition = position;
    this.model.RegDate = this.date;
    try {
      let response = await this._adminService.insertAsync(this.model);
      await this._logService.createLogAsync(response['message'],'Admin Add',1);
      await this.router.navigate(['/admin']);
      await this.showNotification( 'success', response['message'] );
    } catch (error) {
      await this._logService.createLogAsync(error['message'],'Admin Add',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );    
      }
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

import { Component } from '@angular/core';
import {AdminModel} from './admin.model';
import { AdminService } from '../../utils/services';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent {
  model:Array<AdminModel>;

  constructor(private router: Router, private _adminService: AdminService , private notifier: NotifierService)
  {}

  async ngOnInit(){
    try {
      this.model = <Array<AdminModel>>await this._adminService.listAsync();
    } catch (error) {
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );      
    }
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }
}


function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
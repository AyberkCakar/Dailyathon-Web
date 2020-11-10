import { Component } from '@angular/core';
import {AdminlogModel} from './adminlog.model';
import {AdminlogService} from '../../../utils/services';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'adminlog',
  templateUrl: './adminlog.component.html'
})

export class AdminlogComponent {
  model:Array<AdminlogModel>;
  constructor(
    private router: Router, 
    private _adminlogService: AdminlogService , 
    private notifier: NotifierService ,
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<AdminlogModel>>await this._adminlogService.listAsync()
    } catch (error) {
      await this._adminlogService.createLogAsync(error['message'],'Admin Log List',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );   
    }
  };

  async logClear(){
    try {
      let response = await this._adminlogService.logClearAsync();
      await this._adminlogService.createLogAsync(response['message'],'Admin Log Delete',1);
      await this.showNotification( 'success', response['message'] );
      await this.ngOnInit();
    }catch (error) {
      await this._adminlogService.createLogAsync(error['message'],'Admin Log Delete',0);
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
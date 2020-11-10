import { Component } from '@angular/core';
import {DatabotlogModel} from './databotlog.model';
import {DatabotlogService,AdminlogService} from '../../../utils/services';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'databotlog',
  templateUrl: './databotlog.component.html'
})

export class DatabotlogComponent {
  model:Array<DatabotlogModel>;
  constructor(
    private router: Router, 
    private _databotlogService: DatabotlogService , 
    private notifier: NotifierService,
    private _logService: AdminlogService
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<DatabotlogModel>>await this._databotlogService.listAsync()
    } catch (error) {
      await this._logService.createLogAsync(error['message'],'Databot List',0);
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
      let response = await this._databotlogService.logClearAsync();
      await this._logService.createLogAsync(response['message'],'Databot Log Delete',1);
      await this.showNotification( 'success', response['message'] );
      await this.ngOnInit();
    }catch (error) {
      await this._logService.createLogAsync(error['message'],'Databot Log Delete',0);
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
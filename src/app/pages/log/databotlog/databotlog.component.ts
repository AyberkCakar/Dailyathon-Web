import { Component } from '@angular/core';
import {DatabotlogModel} from './databotlog.model';
import {DatabotlogService} from '../../../utils/services';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'databotlog',
  templateUrl: './databotlog.component.html'
})

export class DatabotlogComponent {
  model:Array<DatabotlogModel>;
  constructor(private router: Router, private _databotlogService: DatabotlogService , private notifier: NotifierService)
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<DatabotlogModel>>await this._databotlogService.listAsync()
    } catch (error) {
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
      await this.showNotification( 'success', response['message'] );
      await this.ngOnInit();
    }catch (error) {
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
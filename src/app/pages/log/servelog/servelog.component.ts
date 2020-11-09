import { Component } from '@angular/core';
import {ServelogModel} from './servelog.model';
import {ServelogService} from '../../../utils/services';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'servelog',
  templateUrl: './servelog.component.html'
})

export class ServelogComponent {
  model:Array<ServelogModel>;
  constructor(private router: Router, private _servelogService: ServelogService , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<ServelogModel>>await this._servelogService.listAsync()
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
      let response = await this._servelogService.logClearAsync();
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
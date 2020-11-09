import { Component } from '@angular/core';
import {SportModel} from '../sport.model';
import {SportService} from '../../../utils/services';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'sport-add',
  templateUrl: './sport-add.component.html'
})

export class SportAddComponent {
  model: SportModel = new SportModel();
  constructor(private router: Router, private _sportService: SportService , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
  }

  async sportAdd( sportname: string , tablename: string)
  {
    this.model.SportName = sportname;
    this.model.LeagueTableName = tablename;
    try {
      let response = await this._sportService.insertAsync(this.model);
      await this.showNotification( 'success', response['message'] );
      await delay(4000);
      await this.router.navigate(['/sport']);
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
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
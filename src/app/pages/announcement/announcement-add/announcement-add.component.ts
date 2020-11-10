import { Component } from '@angular/core';
import {AnnouncementModel} from '../announcement.model';
import { AnnouncementService,AdminlogService } from '../../../utils/services';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'announcement-add',
  templateUrl: './announcement-add.component.html'
})

export class AnnouncementAddComponent {
  model: AnnouncementModel = new AnnouncementModel();
  date = new Date();
  constructor(
    private router: Router, 
    private _announcementService: AnnouncementService , 
    private notifier: NotifierService,
    private _logService: AdminlogService
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async announcementAdd(title:string , content:string)
  {
    this.model.AnnouncementTitle = title;
    this.model.AnnouncementContent = content;
    this.model.AnnouncementDate = this.date;
    try {
      let response = await this._announcementService.insertAsync(this.model);
      await this._logService.createLogAsync(response['message'],'Announcement Add',1);
      await this.router.navigate(['/announcement']);
      await this.showNotification( 'success', response['message'] );
    } catch (error) {
      await this._logService.createLogAsync(error['message'],'Announcement Add',0);
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
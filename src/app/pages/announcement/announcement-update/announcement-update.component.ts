import { Component } from '@angular/core';
import {AnnouncementModel} from '../announcement.model';
import { AnnouncementService,AdminlogService } from '../../../utils/services';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'announcement-update',
  templateUrl: './announcement-update.component.html'
})

export class AnnouncementUpdateComponent {
  state: number;
  message: string;
  model: AnnouncementModel = new AnnouncementModel();
  announcement: AnnouncementModel = new AnnouncementModel();
  constructor(
    private router: Router, 
    private _announcementService: AnnouncementService, 
    private _router: ActivatedRoute , 
    private notifier: NotifierService ,
    private _logService: AdminlogService
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.announcement.AnnouncementID = +this._router.snapshot.paramMap.get('id');
      this.model = <AnnouncementModel>await this._announcementService.findAsync(this.announcement);
    }
    catch (error) {
      await this._logService.createLogAsync(error['message'],'Announcement Update Find Data',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );  
    }
  }

  async announcementUpdate(id: number , title: string, content: string)
  {
    this.model.AnnouncementID = id;
    this.model.AnnouncementTitle = title;
    this.model.AnnouncementContent = content;
    try {
      let response = await this._announcementService.updateAsync(this.model);
      this.state=1;
      this.message= response['message'];
      await this.showNotification( 'success', response['message'] );
      await this.router.navigate(['/announcement']);
      } catch (error) {
        this.state=0;
        this.message= error['message'];
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );  
    }
    finally{
      await this._logService.createLogAsync(this.message,'Admin Update',this.state);
    }
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
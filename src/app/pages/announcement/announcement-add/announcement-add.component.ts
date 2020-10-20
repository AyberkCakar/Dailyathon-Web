import { Component } from '@angular/core';
import {AnnouncementModel} from '../announcement.model';
import { AnnouncementService } from '../../../utils/services';
import { Router } from '@angular/router';


@Component({
  selector: 'announcement-add',
  templateUrl: './announcement-add.component.html'
})

export class AnnouncementAddComponent {

  model: AnnouncementModel = new AnnouncementModel();
  date = new Date();
  constructor(private router: Router, private _announcementService: AnnouncementService )
  {
  }

  async announcementAdd(title:string , content:string)
  {
    this.model.AnnouncementTitle = title;
    this.model.AnnouncementContent = content;
    this.model.AnnouncementDate = this.date;
    try {
      await this._announcementService.insertAsync(this.model);
      await this.router.navigateByUrl('/announcement');
    } catch (error) {

    }
  }

}

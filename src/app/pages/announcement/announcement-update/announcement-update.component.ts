import { Component } from '@angular/core';
import {AnnouncementModel} from '../announcement.model';
import { AnnouncementService } from '../../../utils/services';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'announcement-update',
  templateUrl: './announcement-update.component.html'
})

export class AnnouncementUpdateComponent {

  model: AnnouncementModel = new AnnouncementModel();
  announcement: AnnouncementModel = new AnnouncementModel();
  constructor(private router: Router, private _announcementService: AnnouncementService, private _router: ActivatedRoute )
  {}

  async ngOnInit(){
    try {
      this.announcement.AnnouncementID = +this._router.snapshot.paramMap.get('id');
      this.model = <AnnouncementModel>await this._announcementService.findAsync(this.announcement);
    }
    catch (e) {
    }
  }

  async announcementUpdate(id: number , title: string, content: string)
  {
    this.model.AnnouncementID = id;
    this.model.AnnouncementTitle = title;
    this.model.AnnouncementContent = content;
    try {
      await this._announcementService.updateAsync(this.model);
      await this.router.navigateByUrl('/announcement');
    } catch (error) {

    }
  }
}

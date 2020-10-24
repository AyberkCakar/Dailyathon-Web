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
    }
    catch (e) {
    }
  }
}

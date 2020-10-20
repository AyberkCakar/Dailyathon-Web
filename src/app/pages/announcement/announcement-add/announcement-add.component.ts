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



}

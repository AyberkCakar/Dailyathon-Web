import { Component } from '@angular/core';
import {AnnouncementModel} from './announcement.model';
import { AnnouncementService } from '../../utils/services';
import { Router } from '@angular/router';


@Component({
  selector: 'announcement',
  templateUrl: './announcement.component.html'
})

export class AnnouncementComponent {

  model:Array<AnnouncementModel>;
  constructor(private router: Router, private _announcementService: AnnouncementService )
  {
  }
  
  async ngOnInit(){
    try {
      this.model = <Array<AnnouncementModel>>await this._announcementService.listAsync()
      
    } catch (error) {
      
    }
  }
}

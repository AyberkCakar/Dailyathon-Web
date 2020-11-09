import { Component } from '@angular/core';
import {EventModel} from '../event.model';
import {EventService} from '../../../utils/services';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'event-add',
  templateUrl: './event-add.component.html'
})

export class EventAddComponent {
  model: EventModel = new EventModel();
  constructor(private router: Router, private _eventService: EventService , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
  }

  async eventAdd(eventname: string, content: string, start: Date, due: Date, isFree: boolean, posterurl: string
    ,ticketurl: string, city: string, district: string, venue: string, performer: string ,categoryID: number)
  {
    this.model.EntertainmentName = eventname;
    this.model.EntertainmentContent = content;
    this.model.EntertainmentStartDate = start;
    this.model.EntertainmentDueDate = due;
    this.model.EntertainmentisFree = isFree;
    this.model.EntertainmentPosterUrl = posterurl;
    this.model.EntertainmentTicketUrl = ticketurl;
    this.model.EntertainmentCity = city;
    this.model.EntertainmentDistrict = district;
    this.model.EntertainmentVenue = venue;
    this.model.EntertainmentPerformer = performer;
    this.model.TagID = categoryID;
    try {
      let response = await this._eventService.insertAsync(this.model);
      await this.showNotification( 'success', response['message'] );
      await delay(4000);
      await this.router.navigate(['/event']);
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

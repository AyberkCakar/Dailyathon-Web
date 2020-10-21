import { Component } from '@angular/core';
import {EventModel} from '../event.model';
import {EventService} from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'event-add',
  templateUrl: './event-add.component.html'
})

export class EventAddComponent {
  model: EventModel = new EventModel();
  constructor(private router: Router, private _eventService: EventService )
  {
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
    this.model.EntertainmentCategoryID = categoryID;
    try {
      await this._eventService.insertAsync(this.model);
      await this.router.navigateByUrl('/event');
    } catch (error) {
    }
  }
}

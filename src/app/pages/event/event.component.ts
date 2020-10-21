import { Component } from '@angular/core';
import {EventModel} from './event.model';
import {EventService} from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'event',
  templateUrl: './event.component.html'
})

export class EventComponent {
  model:Array<EventModel>;
  constructor(private router: Router, private _eventService: EventService )
  {
  }

  async ngOnInit(){
    try {
      this.model = <Array<EventModel>>await this._eventService.listAsync();
    } catch (error) {
    }
  }

  goRouter()
  {
    this.router.navigateByUrl('/eventAdd');
  }
}

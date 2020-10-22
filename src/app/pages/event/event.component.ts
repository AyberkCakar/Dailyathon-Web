import { Component } from '@angular/core';
import {EventModel} from './event.model';
import {EventService} from '../../utils/services';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'event',
  templateUrl: './event.component.html'
})

export class EventComponent {
  model:Array<EventModel>;
  announcement: EventModel = new EventModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _eventService: EventService , private modalService: NgbModal )
  {}

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

  open(content, ID) {
    this.deleteID = ID;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

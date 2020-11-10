import { Component } from '@angular/core';
import {EventModel} from './event.model';
import {EventService,AdminlogService} from '../../utils/services';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'event',
  templateUrl: './event.component.html'
})

export class EventComponent {
  model:Array<EventModel>;
  event: EventModel = new EventModel();
  closeResult: string;
  deleteID: number;
  constructor(
    private router: Router, 
    private _eventService: EventService , 
    private modalService: NgbModal ,
    private notifier: NotifierService,
    private _logService: AdminlogService
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<EventModel>>await this._eventService.listAsync();
    } catch (error) {
      await this._logService.createLogAsync(error['message'],'Event List',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message ); 
    }
  }

  async deleteEvent()
  {
    this.event.EntertainmentID = this.deleteID;
    try {
      let response= await this._eventService.deleteAsync(this.event);
      await this._logService.createLogAsync(response['message'],'Event Delete',1);
      await this.showNotification( 'success', response['message'] );
      this.ngOnInit();
      this.modalService.dismissAll();
    }catch (error) {
      await this._logService.createLogAsync(error['message'],'Event Delete',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );
    };
  };

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

  async details(content, ID)
  {
    this.event.EntertainmentID = ID;
    try {
      this.event = <EventModel>await this._eventService.detailsAsync(this.event);
      await  this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }catch (error) {
      await this._logService.createLogAsync(error['message'],'Event Details',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message ); 
    };
  };
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
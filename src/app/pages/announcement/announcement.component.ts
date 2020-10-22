import { Component } from '@angular/core';
import {AnnouncementModel} from './announcement.model';
import { AnnouncementService } from '../../utils/services';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'announcement',
  templateUrl: './announcement.component.html'
})

export class AnnouncementComponent {

  model:Array<AnnouncementModel>;
  announcement: AnnouncementModel = new AnnouncementModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _announcementService: AnnouncementService , private modalService: NgbModal)
  {}

  async ngOnInit(){
    try {
      this.model = <Array<AnnouncementModel>>await this._announcementService.listAsync()

    } catch (error) {

    }
  };

  goRouter()
  {
    this.router.navigateByUrl('/announcementAdd');
  };

  async deleteAnnouncement()
  {
    this.announcement.AnnouncementID = this.deleteID;
    try {
      await this._announcementService.deleteAsync(this.announcement);
      this.ngOnInit();
      this.modalService.dismissAll();
    }catch (e) {
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
}

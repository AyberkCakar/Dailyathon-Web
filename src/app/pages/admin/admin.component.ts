import { Component } from '@angular/core';
import {AdminModel} from './admin.model';
import { AdminService } from '../../utils/services';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent {

  model:Array<AdminModel>;
  admin: AdminModel = new AdminModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _adminService: AdminService , private modalService: NgbModal)
  {}

  async ngOnInit(){
    try {
      this.model = <Array<AdminModel>>await this._adminService.listAsync();
    } catch (error) {
    }
  }

  goRouter()
  {
    this.router.navigateByUrl('/adminAdd');
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

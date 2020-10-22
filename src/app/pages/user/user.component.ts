import { Component } from '@angular/core';
import {UserModel} from './user.model';
import { UserService } from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user',
  templateUrl: './user.component.html'
})

export class UserComponent {
  model:Array<UserModel>;
  user: UserModel = new UserModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _userService: UserService , private modalService: NgbModal)
  {}

  async ngOnInit(){
    try {
      this.model = <Array<UserModel>>await this._userService.listAsync();
    } catch (error) {
    }
  }

  async deleteUser()
  {
    this.user.UserID = this.deleteID;
    try {
      await this._userService.deleteAsync(this.user);
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

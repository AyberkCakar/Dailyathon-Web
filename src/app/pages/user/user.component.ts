import { Component } from '@angular/core';
import {UserModel} from './user.model';
import { UserService,AdminlogService } from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'user',
  templateUrl: './user.component.html'
})

export class UserComponent {
  model:Array<UserModel>;
  user: UserModel = new UserModel();
  closeResult: string;
  deleteID: number;
  constructor(
    private router: Router, 
    private _userService: UserService , 
    private modalService: NgbModal, 
    private notifier: NotifierService,
    private _logService: AdminlogService,
    )
  {}

  async ngOnInit(){
    try {
      this.model = <Array<UserModel>>await this._userService.listAsync();
      await this._logService.createLogAsync(null,'User List',1);
    } catch (error) {
      await this._logService.createLogAsync(error['message'],'User List',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' )
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );
    }
  }

  async deleteUser()
  {
    this.user.UserID = this.deleteID;
    try {
      let response = await this._userService.deleteAsync(this.user);
      await this._logService.createLogAsync(response['message'],'User Delete',1);
      await this.showNotification( 'success', response['message'] )
      this.ngOnInit();
      this.modalService.dismissAll();
    }catch (error) {
      await this._logService.createLogAsync(error['message'],'User Delete',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' )
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

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
import { Component } from '@angular/core';
import {SportModel} from './sport.model';
import {SportService} from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'sport',
  templateUrl: './sport.component.html'
})

export class SportComponent {
  model:Array<SportModel>;
  sport: SportModel = new SportModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _sportService: SportService , private modalService: NgbModal , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<SportModel>>await this._sportService.listAsync();
      if (this.model == null) {
        this.showNotification( 'error', this.model['message'] );
      }
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

  async deleteSport()
  {
    this.sport.SportID = this.deleteID;
    try {
      let response = await this._sportService.deleteAsync(this.sport);
      await this.showNotification( 'success', response['message'] );
      this.ngOnInit();
      this.modalService.dismissAll();
    }catch (error) {
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
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
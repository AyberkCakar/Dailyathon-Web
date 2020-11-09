import { Component } from '@angular/core';
import {TagModel} from './tag.model';
import { TagService } from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html'
})

export class TagComponent {
  model:Array<TagModel>;
  tag: TagModel = new TagModel();
  closeResult: string;
  deleteID: number;
  public constructor(private router: Router, private _tagService: TagService , private modalService: NgbModal , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<TagModel>>await this._tagService.listAsync();
    } catch (error) {
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );
    }
  };

  async deleteTag()
  {
    this.tag.TagID = this.deleteID;
    try {
      let response = await this._tagService.deleteAsync(this.tag);
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
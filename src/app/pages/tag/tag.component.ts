import { Component } from '@angular/core';
import {TagModel} from './tag.model';
import { TagService } from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html'
})

export class TagComponent {
  model:Array<TagModel>;
  tag: TagModel = new TagModel();
  closeResult: string;
  deleteID: number;
  public constructor(private router: Router, private _tagService: TagService , private modalService: NgbModal  )
  {}

  async ngOnInit(){
    try {
      this.model = <Array<TagModel>>await this._tagService.listAsync();
    } catch (error) {
    }
  };

  async deleteTag()
  {
    this.tag.TagID = this.deleteID;
    try {
      await this._tagService.deleteAsync(this.tag);
      this.ngOnInit();
      this.modalService.dismissAll();
    }catch (e) {
      console.log(e);
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

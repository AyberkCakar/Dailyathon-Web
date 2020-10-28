import { Component } from '@angular/core';
import {CategoryModel} from './category.model';
import { CategoryService } from '../../utils/services';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'category',
  templateUrl: './category.component.html'
})

export class CategoryComponent {
  model:Array<CategoryModel>;
  category: CategoryModel = new CategoryModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _categoryService: CategoryService , private modalService: NgbModal , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<CategoryModel>>await this._categoryService.listAsync();
      if (this.model == null)
      {
        this.showNotification( 'error', this.model['message'] );
      }
    } catch (error) {
      this.showNotification( 'error', error.message );
    }
  };

  async deleteCategory()
  {
    this.category.CategoryID = this.deleteID;
    try {
        await this._categoryService.deleteAsync(this.category);
        this.ngOnInit();
        this.modalService.dismissAll();
    }catch (error) {
      this.showNotification( 'error', error.message );
    };
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

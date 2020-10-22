import { Component } from '@angular/core';
import {CategoryModel} from './category.model';
import { CategoryService } from '../../utils/services';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'category',
  templateUrl: './category.component.html'
})

export class CategoryComponent {
  model:Array<CategoryModel>;
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _categoryService: CategoryService , private modalService: NgbModal)
  {
  }

  async ngOnInit(){
    try {
      this.model = <Array<CategoryModel>>await this._categoryService.listAsync()
    } catch (error) {
    }
  };

  goRouter()
  {
    this.router.navigateByUrl('/categoryAdd');
  };

  deleteCategory()
  {
    console.log(this.deleteID);
    this.modalService.dismissAll();
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

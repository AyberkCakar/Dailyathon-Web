import { Component } from '@angular/core';
import {CategoryModel} from '../category.model';
import { CategoryService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'category-add',
  templateUrl: './category-add.component.html'
})

export class CategoryAddComponent {

  model: CategoryModel = new CategoryModel();
  constructor(private router: Router, private _categoryService: CategoryService )
  {
  }
  async ngOnInit(){
  }
  async categoryAdd(categoryname:string)
  {
    this.model.CategoryName = categoryname;
    try {
      await this._categoryService.insertAsync(this.model)
      await this.router.navigateByUrl('/category')
    } catch (error) {

    }
  }

}

import { Component } from '@angular/core';
import {CategoryModel} from '../category.model';
import { CategoryService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'category',
  templateUrl: './category-add.component.html'
})

export class CategoryAddComponent {

  model: CategoryModel = new CategoryModel();
  constructor(private router: Router, private _categoryService: CategoryService )
  {
  }
  async ngOnInit(){
  }
  async categoryAdd()
  {
    try {

    } catch (error) {

    }
  }

}

import { Component } from '@angular/core';
import {CategoryModel} from './category.model';
import { CategoryService } from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'category',
  templateUrl: './category.component.html'
})

export class CategoryComponent {
  model:Array<CategoryModel>;
  constructor(private router: Router, private _userService: CategoryService )
  {
  }
  
  async ngOnInit(){
    try {
      this.model = <Array<CategoryModel>>await this._userService.listAsync()
      
    } catch (error) {
      
    }
  }
}

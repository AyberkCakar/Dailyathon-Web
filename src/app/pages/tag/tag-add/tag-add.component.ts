import { Component } from '@angular/core';
import {TagModel} from '../tag.model';
import {CategoryModel} from '../../category/category.model';

import { TagService, CategoryService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'tag-add',
  templateUrl: './tag-add.component.html'
})

export class TagAddComponent {

  model: TagModel = new TagModel();
  category: Array<CategoryModel>;
  constructor(private router: Router, private _tagService: TagService ,private _categoryService:CategoryService)
  {
  }

  async ngOnInit(){
    try {
      this.category = <Array<CategoryModel>>await this._categoryService.listAsync()
    } catch (error) {
    }
  }
}

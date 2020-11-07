import { Component } from '@angular/core';
import {TagModel} from '../tag.model';
import {CategoryModel} from '../../category/category.model';
import {NotifierService} from 'angular-notifier';
import { TagService, CategoryService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'tag-add',
  templateUrl: './tag-add.component.html'
})

export class TagAddComponent {

  model: TagModel = new TagModel();
  category: Array<CategoryModel>;
  constructor(private router: Router , private notifier: NotifierService , private _tagService: TagService ,private _categoryService:CategoryService)
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message )
  }

  async ngOnInit(){
    try {
      this.category = <Array<CategoryModel>>await this._categoryService.listAsync()
    } catch (error) {
      this.showNotification( 'error', error.message )
    }
  }
  async tagAdd(tagname:string,categoryID:number)
  {
    this.model.TagName = tagname;
    this.model.CategoryID = categoryID
    try {
      await this._tagService.insertAsync(this.model)
      await this.router.navigateByUrl('/tag')
    } catch (error) {
      this.showNotification( 'error', error.message )
    }
  }
}

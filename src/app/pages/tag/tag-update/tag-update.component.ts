import { Component } from '@angular/core';
import {TagModel} from '../tag.model';
import {CategoryModel} from '../../category/category.model';
import {NotifierService} from 'angular-notifier';
import { TagService, CategoryService } from '../../../utils/services';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'tag-update',
  templateUrl: './tag-update.component.html'
})

export class TagUpdateComponent {

  model: TagModel = new TagModel();
  tag: TagModel = new TagModel();
  category: Array<CategoryModel>;
  constructor(private _router: ActivatedRoute ,private router: Router , private notifier: NotifierService , private _tagService: TagService ,private _categoryService:CategoryService)
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message )
  }

  async ngOnInit(){
    try {
      this.model.TagID = +this._router.snapshot.paramMap.get('id');
      this.category = <Array<CategoryModel>>await this._categoryService.listAsync();
      this.model = <TagModel>await this._tagService.findAsync(this.model);

    } catch (error) {
      this.showNotification( 'error', error.message )
    }
  }
  async tagUpdate(tagname:string,categoryID:number)
  {
    this.model.TagName = tagname;
    this.model.CategoryID = categoryID
    try {
      await this._tagService.updateAsync(this.model)
      await this.router.navigateByUrl('/tag')
    } catch (error) {
      this.showNotification( 'error', error.message )
    }
  }
}

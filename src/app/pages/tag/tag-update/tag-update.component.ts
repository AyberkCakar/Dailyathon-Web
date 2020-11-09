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
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message ); 
    }
  }
  
  async tagUpdate(tagname:string,categoryID:number)
  {
    this.model.TagName = tagname;
    this.model.CategoryID = categoryID
    try {
      let response = await this._tagService.updateAsync(this.model)
      await this.showNotification( 'success', response['message'] );
      await delay(4000);
      await this.router.navigate(['/tag']);
      } catch (error) {
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message ); 
    }
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
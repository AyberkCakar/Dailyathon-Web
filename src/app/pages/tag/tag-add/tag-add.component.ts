import { Component } from '@angular/core';
import {TagModel} from '../tag.model';
import {CategoryModel} from '../../category/category.model';
import {NotifierService} from 'angular-notifier';
import { TagService, CategoryService,AdminlogService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'tag-add',
  templateUrl: './tag-add.component.html'
})

export class TagAddComponent {

  model: TagModel = new TagModel();
  category: Array<CategoryModel>;
  constructor(
    private router: Router , 
    private notifier: NotifierService ,
    private _tagService: TagService ,
    private _logService: AdminlogService,
    private _categoryService:CategoryService)
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message )
  }

  async ngOnInit(){
    try {
      this.category = <Array<CategoryModel>>await this._categoryService.listAsync()
    } catch (error) {
      await this._logService.createLogAsync(error['message'],'Tag Add Category List',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );
    }
  }
  async tagAdd(tagname:string,categoryID:number)
  {
    this.model.TagName = tagname;
    this.model.CategoryID = categoryID
    try {
      let response = await this._tagService.insertAsync(this.model);
      await this._logService.createLogAsync(response['message'],'Tag Add',1);
      await this.router.navigate(['/tag']);
      await this.showNotification( 'success', response['message'] );
      } catch (error) {
        await this._logService.createLogAsync(error['message'],'Tag Add',0);
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
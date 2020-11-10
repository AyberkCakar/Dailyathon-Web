import { Component } from '@angular/core';
import {CategoryModel} from '../category.model';
import { CategoryService } from '../../../utils/services';
import { Router, ActivatedRoute } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'category-update',
  templateUrl: './category-update.component.html'
})

export class CategoryUpdateComponent {

  model: CategoryModel = new CategoryModel();
  category: CategoryModel = new CategoryModel();
  constructor(private router: Router, private _categoryService: CategoryService, private _router: ActivatedRoute , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.category.CategoryID = +this._router.snapshot.paramMap.get('id');
      this.model = <CategoryModel>await this._categoryService.findAsync(this.category);
      }
    catch (error) {
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );    
    }
  }

  async categoryUpdate(categoryID: number,categoryname:string)
  {
    this.model.CategoryID = categoryID;
    this.model.CategoryName = categoryname;
    try {
      let response = await this._categoryService.updateAsync(this.model)
      await this.router.navigate(['/admin']);
      await this.showNotification( 'success', response['message'] );
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
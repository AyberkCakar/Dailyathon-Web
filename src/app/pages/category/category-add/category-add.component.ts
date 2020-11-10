import { Component } from '@angular/core';
import {CategoryModel} from '../category.model';
import { CategoryService ,AdminlogService} from '../../../utils/services';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'category-add',
  templateUrl: './category-add.component.html'
})

export class CategoryAddComponent {
  model: CategoryModel = new CategoryModel();
  constructor(
    private router: Router, 
    private _categoryService: CategoryService , 
    private notifier: NotifierService ,
    private _logService: AdminlogService
    )
  {}
  async ngOnInit(){
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async categoryAdd(categoryname:string)
  {
    this.model.CategoryName = categoryname;
    try {
      let response = await this._categoryService.insertAsync(this.model);
      await this._logService.createLogAsync(response['message'],'Category Add',1);
      await this.router.navigate(['/category']);
      await this.showNotification( 'success', response['message'] );
      } catch (error) {
        await this._logService.createLogAsync(error['message'],'Category Add',0);
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
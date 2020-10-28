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
      this.showNotification( 'error', error.message );
    }
  }

  async categoryUpdate(categoryID: number,categoryname:string)
  {
    this.model.CategoryID = categoryID;
    this.model.CategoryName = categoryname;
    try {
      await this._categoryService.updateAsync(this.model)
      await this.router.navigateByUrl('/category')
    } catch (error) {
      this.showNotification( 'error', error.message );
    }
  }
}

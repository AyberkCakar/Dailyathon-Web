import { Component } from '@angular/core';
import {TagModel} from './tag.model';
import { TagService } from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html'
})

export class TagComponent {

  model:Array<TagModel>;
  constructor(private router: Router, private _userService: TagService )
  {
  }
  
  async ngOnInit(){
    try {
      this.model = <Array<TagModel>>await this._userService.listAsync()
      
    } catch (error) {
      
    }
  }
}

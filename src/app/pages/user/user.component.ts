import { Component } from '@angular/core';
import {UserModel} from './user.model';
import { UserService } from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'user',
  templateUrl: './user.component.html'
})


export class UserComponent {
  model:Array<UserModel>;
  constructor(private router: Router, private _userService: UserService )
  {
  }
  
  async ngOnInit(){
    try {
      this.model = <Array<UserModel>>await this._userService.listAsync()
      
    } catch (error) {
      
    }
  }
}

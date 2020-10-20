import { Component } from '@angular/core';
import {SportModel} from './sport.model';
import {SportService,} from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'sport',
  templateUrl: './sport.component.html'
})

export class SportComponent {
  model:Array<SportModel>;
  constructor(private router: Router, private _sportService: SportService )
  {
  }

  async ngOnInit(){
    try {
      this.model = <Array<SportModel>>await this._sportService.listAsync()

    } catch (error) {

    }
  }
}

import { Component } from '@angular/core';
import {ServelogModel} from './servelog.model';
import {ServelogService} from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'servelog',
  templateUrl: './servelog.component.html'
})

export class ServelogComponent {
  model:Array<ServelogModel>;
  constructor(private router: Router, private _servelogService: ServelogService )
  {}

  async ngOnInit(){
    try {
      this.model = <Array<ServelogModel>>await this._servelogService.listAsync()

    } catch (error) {

    }
  };
}

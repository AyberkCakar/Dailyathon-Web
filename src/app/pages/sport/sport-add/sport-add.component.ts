import { Component } from '@angular/core';
import {SportModel} from '../sport.model';
import {SportService} from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'sport-add',
  templateUrl: './sport-add.component.html'
})

export class SportAddComponent {
  model: SportModel = new SportModel();
  constructor(private router: Router, private _sportService: SportService )
  {
  }

  async ngOnInit(){
  }

  async sportAdd(sportname:string,tablename:string)
  {
    this.model.SportName = sportname;
    this.model.LeagueTableName = tablename;
    try {
      await this._sportService.insertAsync(this.model);
      await this.router.navigateByUrl('/sport');
    } catch (error) {

    }
  }
}

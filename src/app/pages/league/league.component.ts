import { Component } from '@angular/core';
import {LeagueModel} from './league.model';
import { LeagueService } from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'category',
  templateUrl: './league.component.html'
})

export class LeagueComponent {
  model:Array<LeagueModel>;
  constructor(private router: Router, private _leagueService: LeagueService )
  {
  }

  async ngOnInit(){
    try {
      this.model = <Array<LeagueModel>>await this._leagueService.listAsync()

    } catch (error) {

    }
  }
}

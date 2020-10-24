import { Component } from '@angular/core';
import {LeagueModel} from '../league.model';
import {SportModel} from '../../sport/sport.model';
import { LeagueService, SportService } from '../../../utils/services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'league-update',
  templateUrl: './league-update.component.html'
})

export class LeagueUpdateComponent {
  model: LeagueModel = new LeagueModel();
  league: LeagueModel = new LeagueModel();
  sportModel:Array<SportModel>;
  constructor(private router: Router, private _leagueService: LeagueService, private _sportService: SportService, private _router: ActivatedRoute)
  {
  }

  async ngOnInit(){
    try {
      this.sportModel = <Array<SportModel>>await this._sportService.listAsync();
    } catch (error) {

    }
  }
}

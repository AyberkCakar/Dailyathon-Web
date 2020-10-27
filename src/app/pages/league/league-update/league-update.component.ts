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
      this.league.LeagueID = +this._router.snapshot.paramMap.get('id');
      this.model = <LeagueModel>await this._leagueService.findAsync(this.league);
    } catch (error) {

    }
  }

  async leagueUpdate(id: number, league: string, country: string, url: string, sporID: number)
  {
    this.model.LeagueID = id;
    this.model.LeagueName = league;
    this.model.LeagueCountry = country;
    this.model.LeagueUrl = url;
    this.model.SportID = sporID;

    try {
      await this._leagueService.updateAsync(this.model);
      await this.router.navigateByUrl('/league');
    } catch (error) {
    }
  }
}
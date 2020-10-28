import { Component } from '@angular/core';
import {LeagueModel} from '../league.model';
import {SportModel} from '../../sport/sport.model';
import { LeagueService, SportService } from '../../../utils/services';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'league-add',
  templateUrl: './league-add.component.html'
})

export class LeagueAddComponent {
  model: LeagueModel = new LeagueModel();
  sportModel:Array<SportModel>;
  constructor(private router: Router, private _leagueService: LeagueService, private _sportService: SportService , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.sportModel = <Array<SportModel>>await this._sportService.listAsync();
    } catch (error) {
      this.showNotification( 'error', error.message );
    }
  }
  async leagueAdd( leaguename: string , leagueCountry: string, url: string, sportID: number)
  {
    this.model.LeagueName = leaguename;
    this.model.LeagueCountry = leagueCountry;
    this.model.LeagueUrl = url;
    this.model.SportID = sportID;
    try {
      await this._leagueService.insertAsync(this.model);
      await this.router.navigateByUrl('/league');
    } catch (error) {
      this.showNotification( 'error', error.message );
    }
  }
}

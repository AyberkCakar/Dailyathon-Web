import { Component } from '@angular/core';
import {LeagueModel} from '../league.model';
import {SportModel} from '../../sport/sport.model';
import { LeagueService, SportService } from '../../../utils/services';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'league-update',
  templateUrl: './league-update.component.html'
})

export class LeagueUpdateComponent {
  model: LeagueModel = new LeagueModel();
  league: LeagueModel = new LeagueModel();
  sportModel:Array<SportModel>;
  constructor(private router: Router, private _leagueService: LeagueService, private _sportService: SportService, private _router: ActivatedRoute , private notifier: NotifierService)
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.sportModel = <Array<SportModel>>await this._sportService.listAsync();
      this.league.LeagueID = +this._router.snapshot.paramMap.get('id');
      this.model = <LeagueModel>await this._leagueService.findAsync(this.league);
    } catch (error) {
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message ); 
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
      let response = await this._leagueService.updateAsync(this.model);
      await this.showNotification( 'success', response['message'] );
      await delay(4000);
      await this.router.navigate(['/league']);
      } catch (error) {
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message ); 
    }
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
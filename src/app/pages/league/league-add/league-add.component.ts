import { Component } from '@angular/core';
import {LeagueModel} from '../league.model';
import {SportModel} from '../../sport/sport.model';
import { LeagueService, SportService ,AdminlogService} from '../../../utils/services';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'league-add',
  templateUrl: './league-add.component.html'
})

export class LeagueAddComponent {
  model: LeagueModel = new LeagueModel();
  sportModel:Array<SportModel>;
  constructor(
    private router: Router, 
    private _leagueService: LeagueService, 
    private _sportService: SportService , 
    private notifier: NotifierService ,
    private _logService: AdminlogService
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.sportModel = <Array<SportModel>>await this._sportService.listAsync();
    } catch (error) {
      await this._logService.createLogAsync(error['message'],'League Add - Category List',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
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
      let response = await this._leagueService.insertAsync(this.model);
      await this._logService.createLogAsync(response['message'],'League Add',1);
      await this.router.navigate(['/league']);
      await this.showNotification( 'success', response['message'] );
      } catch (error) {
        await this._logService.createLogAsync(error['message'],'League Add',0);
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
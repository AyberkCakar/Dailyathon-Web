import { Component } from '@angular/core';
import {SurveyModel} from '../survey.model';
import { SurveyService ,AdminlogService} from '../../../utils/services';
import { Router } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'survey-add',
  templateUrl: './survey-add.component.html'
})

export class SurveyAddComponent {
  model: SurveyModel = new SurveyModel();
  constructor(
    private router: Router, 
    private _surveyService: SurveyService , 
    private notifier: NotifierService ,
    private _logService: AdminlogService
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async surveyAdd(surveyname:string,tablename:string,c1:Date,c2:Date,url:string)
  {
    this.model.SurveyName = surveyname;
    this.model.SurveyTableName = tablename;
    this.model.SurveyStartDate = c1;
    this.model.SurveyDueDate = c2;
    this.model.SurveyUrl = url;
    try {
      let response = await this._surveyService.insertAsync(this.model);
      await this._logService.createLogAsync(response['message'],'Survey Add',1);
      await this.router.navigate(['/survey']);
      await this.showNotification( 'success', response['message'] );
      } catch (error) {
        await this._logService.createLogAsync(error['message'],'Survey Add',0);
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
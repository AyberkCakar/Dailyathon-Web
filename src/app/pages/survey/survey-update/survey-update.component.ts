import { Component   } from '@angular/core';
import {SurveyModel} from '../survey.model';
import { SurveyService ,AdminlogService} from '../../../utils/services';
import { Router, ActivatedRoute } from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'survey-update',
  templateUrl: './survey-update.component.html'
})

export class SurveyUpdateComponent {
  model: SurveyModel = new SurveyModel();
  survey: SurveyModel = new SurveyModel();
  constructor(
    private router: Router, 
    private _surveyService: SurveyService, 
    private _router: ActivatedRoute , 
    private notifier: NotifierService ,
    private _logService: AdminlogService
    )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.survey.SurveyListID = +this._router.snapshot.paramMap.get('id');
      this.model = <SurveyModel>await this._surveyService.findAsync(this.survey);
    }
    catch (error) {
      await this._logService.createLogAsync(error['message'],'Survey Update Find Survey',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );   
    }
  }

  async surveyUpdate(ID: number, name:string, tablename:string, startdate: Date, duedate: Date, url:string)
  {
    this.model.SurveyListID = ID;
    this.model.SurveyName = name;
    this.model.SurveyTableName = tablename;
    this.model.SurveyStartDate = startdate;
    this.model.SurveyDueDate = duedate;
    this.model.SurveyUrl = url;
    try {
      let response = await this._surveyService.updateAsync(this.model);
      await this._logService.createLogAsync(response['message'],'Survey Update',1);
      await this.router.navigate(['/survey']);
      await this.showNotification( 'success', response['message'] );
      } catch (error) {
        await this._logService.createLogAsync(error['message'],'Survey Update',0);
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
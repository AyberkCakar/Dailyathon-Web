import { Component } from '@angular/core';
import {SurveyModel} from '../survey.model';
import { SurveyService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'survey-add',
  templateUrl: './survey-add.component.html'
})

export class SurveyAddComponent {
  model: SurveyModel = new SurveyModel();
  constructor(private router: Router, private _surveyService: SurveyService )
  {
  }

  async surveyAdd(surveyname:string,tablename:string,c1:Date,c2:Date,url:string)
  {
    this.model.SurveyName = surveyname;
    this.model.SurveyTableName = tablename;
    this.model.SurveyStartDate = c1;
    this.model.SurveyDueDate = c2;
    this.model.SurveyUrl = url;
    try {
      await this._surveyService.insertAsync(this.model)
      await this.router.navigateByUrl('/survey')
    } catch (error) {

    }
  }

}

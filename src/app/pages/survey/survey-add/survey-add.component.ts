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


}


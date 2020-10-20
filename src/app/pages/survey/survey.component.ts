import { Component } from '@angular/core';
import {SurveyModel} from './survey.model';
import { SurveyService } from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html'
})

export class SurveyComponent {
  model:Array<SurveyModel>;
  constructor(private router: Router, private _surveyService: SurveyService )
  {
  }

  async ngOnInit(){
    try {
      this.model = <Array<SurveyModel>>await this._surveyService.listAsync()

    } catch (error) {

    }
  };

  goRouter()
  {
    this.router.navigateByUrl('/surveyAdd');
  }

}


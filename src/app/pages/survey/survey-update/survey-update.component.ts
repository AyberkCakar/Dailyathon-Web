import { Component   } from '@angular/core';
import {SurveyModel} from '../survey.model';
import { SurveyService } from '../../../utils/services';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'survey-update',
  templateUrl: './survey-update.component.html'
})

export class SurveyUpdateComponent {

  model: SurveyModel = new SurveyModel();
  survey: SurveyModel = new SurveyModel();
  constructor(private router: Router, private _surveyService: SurveyService, private _router: ActivatedRoute )
  {}

  async ngOnInit(){
    try {
      this.survey.SurveyListID = +this._router.snapshot.paramMap.get('id');
      }
    catch (e) {
    }
  }

}

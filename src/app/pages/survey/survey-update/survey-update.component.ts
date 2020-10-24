import { Component   } from '@angular/core';
import {SurveyModel} from '../survey.model';
import { SurveyService } from '../../../utils/services';
import { Router,ActivatedRoute } from '@angular/router';
import {CategoryModel} from '../../category/category.model';

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
      this.model = <SurveyModel>await this._surveyService.findAsync(this.survey);
    }
    catch (e) {
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
      await this._surveyService.updateAsync(this.model);
      await this.router.navigateByUrl('/survey');
    } catch (error) {

    }
  }
}

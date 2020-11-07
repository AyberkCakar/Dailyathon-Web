import { Component, ViewEncapsulation, Inject, ViewChild,OnInit } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import {SurveyModel} from '../survey.model';
import { SurveyService } from '../../../utils/services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['survey-details.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SurveyDetailsComponent implements OnInit {
  survey: SurveyModel = new SurveyModel();
  datas;
  constructor(
    private _surveyService: SurveyService,
    private _router: ActivatedRoute 
  ){
    this.survey.SurveyListID = +this._router.snapshot.paramMap.get('id');
    this.datas=this._surveyService.datatableAsync(this.survey);
  }
  
  @ViewChild('default',{static: false})
   public spreadsheetObj: SpreadsheetComponent;
   public openUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open';
   public saveUrl = 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save';
   created() {
       this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
       this.spreadsheetObj.cellFormat({ fontWeight: 'bold' }, 'E31:F31');
       this.spreadsheetObj.cellFormat({ textAlign: 'right' }, 'E31');
   }


  ngOnInit() {
  }
}


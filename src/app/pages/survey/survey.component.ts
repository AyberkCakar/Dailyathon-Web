import { Component } from '@angular/core';
import {SurveyModel} from './survey.model';
import { SurveyService } from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html'
})

export class SurveyComponent {
  model:Array<SurveyModel>;
  survey: SurveyModel = new SurveyModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _surveyService: SurveyService , private modalService: NgbModal )
  {}

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

  async deleteSurvey()
  {
    this.survey.SurveyListID = this.deleteID;
    try {
      await this._surveyService.deleteAsync(this.survey);
      this.ngOnInit();
      this.modalService.dismissAll();
    }catch (e) {
      console.log(e);
    };
  };

  open(content, ID) {
    this.deleteID = ID;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}


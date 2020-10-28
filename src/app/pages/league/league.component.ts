import { Component } from '@angular/core';
import {LeagueModel} from './league.model';
import {ScoreModel} from './score.model';
import { LeagueService } from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'league',
  templateUrl: './league.component.html'
})

export class LeagueComponent {
  model:Array<LeagueModel>;
  league: LeagueModel = new LeagueModel();
  scoreReq: LeagueModel = new LeagueModel();
  scores: Array<ScoreModel>;
  closeResult: string;
  leagueID: number;
  constructor(private router: Router, private _leagueService: LeagueService , private modalService: NgbModal , private notifier: NotifierService )
  {}

  async ngOnInit(){
    try {
      this.model = <Array<LeagueModel>>await this._leagueService.listAsync();
    } catch (error) {
      this.showNotification( 'error', error.message );
    }
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async deleteLeague()
  {
    this.league.LeagueID = this.leagueID;
    try {
      await this._leagueService.deleteAsync(this.league);
      this.ngOnInit();
      this.modalService.dismissAll();
    }catch (error) {
      this.showNotification( 'error', error.message );
    };
  };

  open(content, ID) {
    this.leagueID = ID;
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

  async score(content, ID, sportID)
  {
    this.scoreReq.LeagueID = ID;
    this.scoreReq.SportID = sportID;
    try {
      this.scores = <Array<ScoreModel>>await this._leagueService.scoreAsync(this.scoreReq);
      await  this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }catch (error) {
      this.showNotification( 'error', error.message );
    };
  };
}

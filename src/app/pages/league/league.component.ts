import { Component } from '@angular/core';
import {LeagueModel} from './league.model';
import { LeagueService } from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'league',
  templateUrl: './league.component.html'
})

export class LeagueComponent {
  model:Array<LeagueModel>;
  league: LeagueModel = new LeagueModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _leagueService: LeagueService , private modalService: NgbModal )
  {}

  async ngOnInit(){
    try {
      this.model = <Array<LeagueModel>>await this._leagueService.listAsync()
    } catch (error) {
    }
  }

  goRouter()
  {
    this.router.navigateByUrl('/leagueAdd');
  }

  async deleteLeague()
  {
    this.league.LeagueID = this.deleteID;
    try {
      await this._leagueService.deleteAsync(this.league);
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

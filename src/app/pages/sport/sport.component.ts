import { Component } from '@angular/core';
import {SportModel} from './sport.model';
import {SportService} from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sport',
  templateUrl: './sport.component.html'
})

export class SportComponent {
  model:Array<SportModel>;
  sport: SportModel = new SportModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _sportService: SportService , private modalService: NgbModal )
  {}

  async ngOnInit(){
    try {
      this.model = <Array<SportModel>>await this._sportService.listAsync();
    } catch (error) {
    }
  }

  goRouter()
  {
    this.router.navigateByUrl('/sportAdd');
  }

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

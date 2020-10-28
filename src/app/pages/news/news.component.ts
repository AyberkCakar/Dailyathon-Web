import { Component } from '@angular/core';
import {NewsModel} from './news.model';
import {NewsService} from '../../utils/services';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'news',
  templateUrl: './news.component.html'
})

export class NewsComponent {
  model:Array<NewsModel>;
  news: NewsModel = new NewsModel();
  closeResult: string;
  deleteID: number;
  constructor(private router: Router, private _newsService: NewsService , private modalService: NgbModal , private notifier: NotifierService )
  {}

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model = <Array<NewsModel>>await this._newsService.listAsync();
      if(this.model == null){
        this.showNotification( 'error', this.model.message );
      }
    } catch (error) {
      this.showNotification( 'error', error.message );
    }
  }

  async deleteNews()
  {
    this.news.NewsID = this.deleteID;
    try {
      await this._newsService.deleteAsync(this.news);
      this.ngOnInit();
      this.modalService.dismissAll();
    }catch (error) {
      this.showNotification( 'error', error.message );
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

  async details(content, ID)
  {
    this.news.NewsID = ID;

    try {
      this.news = <NewsModel>await this._newsService.detailsAsync(this.news);
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

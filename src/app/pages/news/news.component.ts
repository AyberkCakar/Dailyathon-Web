import { Component } from '@angular/core';
import {NewsModel} from './news.model';
import {NewsService} from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'news',
  templateUrl: './news.component.html'
})

export class NewsComponent {
  model:Array<NewsModel>;
  constructor(private router: Router, private _newsService: NewsService )
  {
  }

  async ngOnInit(){
    try {
      this.model = <Array<NewsModel>>await this._newsService.listAsync()

    } catch (error) {

    }
  }
}

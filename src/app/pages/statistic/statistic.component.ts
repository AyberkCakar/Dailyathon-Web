import { Component } from '@angular/core';
import * as global from '../../config/globals';
import { StatisticModel } from './statistic.model';
import { CategoryStatisticModel } from './categoryStatistic.model';
import { StatisticService, CategoryService ,AdminlogService} from '../../utils/services';
import { CategoryModel } from '../category/category.model'
import { NotifierService } from 'angular-notifier';
import { Router} from '@angular/router';

declare let d3: any;

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html'
})

export class StatisticComponent {
  chartColor;
  chartColor2;
  chartData = [];
  chartData2 = [];
  category: Array<CategoryModel>;
  statistic: Array<CategoryStatisticModel>;
  categorySelect: CategoryModel = new CategoryModel();
  response: string;
  constructor(
    private _statisticService: StatisticService,
    private _categoryService: CategoryService,
    private notifier: NotifierService,
    private router: Router,
    private _logService: AdminlogService
  ) { }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  async ngOnInit() {
    this.categorySelect.CategoryID = 1;
    this.chartColor = { domain: [global.COLOR_BLUE, global.COLOR_GREEN, global.COLOR_PURPLE, global.COLOR_YELLOW_TRANSPARENT_1, global.COLOR_BLACK, global.COLOR_RED, global.COLOR_RED_TRANSPARENT_1, global.COLOR_ORANGE_LIGHTER] };
    try {
      let response = await this._statisticService.ageStatisticAsync();
      this.category = <Array<CategoryModel>>await this._categoryService.listAsync();
      this.statistic = <Array<CategoryStatisticModel>>await this._statisticService.categoryStatisticAsync(this.categorySelect);

      this.chartData = <Array<StatisticModel>>await this._statisticService.categoryStatisticAsync(this.categorySelect);
      this.chartColor2 = { domain: [global.COLOR_RED_TRANSPARENT_1, global.COLOR_ORANGE_LIGHTER, global.COLOR_YELLOW_TRANSPARENT_1, global.COLOR_BLUE, global.COLOR_RED, global.COLOR_BLACK, global.COLOR_PURPLE, global.COLOR_GREEN] };

      this.chartData.splice(0,9999999);
      this.response =JSON.stringify(response[0])
      var splitted = this.response.split("{")
      var splitted = String(splitted).split("}")
      var splitted = String(splitted).split('"')
      var splitted = String(splitted).split(":")
      var splitted = String(splitted).split(",")

      splitted.forEach((element,index)=>{
        if(index == 4 )
        {
          let chart: obj = { name:'0-13' ,value:+element};
          this.chartData.push(chart)
        }
        else if(index == 8){
          let chart: obj = { name:'13-21' ,value:+element};
          this.chartData.push(chart)
        }
        else if(index == 12){
          let chart: obj = { name:'21-35' ,value:+element};
          this.chartData.push(chart)
        }
        else if(index == 16){
          let chart: obj = { name:'35-55' ,value:+element};
          this.chartData.push(chart)
        }
        else if(index == 20){
          let chart: obj = { name:'55-' ,value:+element};
          this.chartData.push(chart)
        }
      });
      await this._logService.createLogAsync(null,'Statistic',1);
    } catch (error) {
      await this._logService.createLogAsync(error['message'],'Statistic',0);
      if(error['message'] == undefined){
        await this.showNotification( 'error', 'Token is invalid. You are redirecting to Login ...' );
        await delay(3000);
        await this.router.navigate(['/login']);
      }
      else
        this.showNotification( 'error', error.message );
    }
  }

  async getStatistic(ID: number)
  {
    try {
      this.categorySelect.CategoryID=ID;
      this.statistic = <Array<CategoryStatisticModel>>await this._statisticService.categoryStatisticAsync(this.categorySelect);

    } catch (error) {
      console.log(error)
    }
  }  
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface obj {
  name: string;
  value: number;
}
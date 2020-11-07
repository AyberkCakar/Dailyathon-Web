import { Component } from '@angular/core';
import * as global from '../../config/globals';
import { StatisticModel } from './statistic.model';
import { CategoryStatisticModel } from './categoryStatistic.model';
import { StatisticService,CategoryService } from '../../utils/services';
import {CategoryModel} from '../category/category.model'

declare let d3: any;

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html'
})

export class StatisticComponent {
  chartColor;
  data: StatisticModel = new StatisticModel();
  chartData: Array<StatisticModel>;
  category: Array<CategoryModel>;
  statistic: Array<CategoryStatisticModel>;
  categorySelect: CategoryModel = new CategoryModel();
  constructor(
    private _statisticService: StatisticService,
    private _categoryService: CategoryService
    ) { }

  async getStatistic(ID: number)
  {
    try {
      this.categorySelect.CategoryID=ID;
      this.statistic = <Array<CategoryStatisticModel>>await this._statisticService.categoryStatisticAsync(this.categorySelect);

    } catch (error) {
      console.log(error)
    }
  }  

  async ngOnInit() {
    this.categorySelect.CategoryID=1;
    this.chartColor = { domain: [global.COLOR_BLUE, global.COLOR_GREEN, global.COLOR_PURPLE, global.COLOR_YELLOW_TRANSPARENT_1, global.COLOR_BLACK, global.COLOR_RED, global.COLOR_RED_TRANSPARENT_1, global.COLOR_ORANGE_LIGHTER] };
    try {
      let response = <Array<StatisticModel>>await this._statisticService.ageStatisticAsync();
      this.category = <Array<CategoryModel>>await this._categoryService.listAsync();
      this.statistic = <Array<CategoryStatisticModel>>await this._statisticService.categoryStatisticAsync(this.categorySelect);

      // Düzelt
      this.chartData = <Array<StatisticModel>>await this._statisticService.categoryStatisticAsync(this.categorySelect);
      this.chartData[0].name='0 - 13';
      this.chartData[0].value = response[0]['age1'];
      this.chartData[1].name='14 - 21';
      this.chartData[1].value = response[0]['age2'];
      this.chartData[2].name='21 - 35';
      this.chartData[2].value = response[0]['age3'];
      this.chartData[3].name='35 - 55';
      this.chartData[3].value = response[0]['age4'];
      this.chartData[4].name='55 - ';
      this.chartData[4].value = response[0]['age5'];
    } catch (error) {
      console.log(error)
    }
  }
}

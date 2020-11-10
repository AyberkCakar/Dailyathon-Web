import { Component, OnInit } from '@angular/core';
import {TagService,UserService,SurveyService,AdminlogService} from '../../../utils/services'
import {SurveyModel} from '../../survey/survey.model';
import {TagModel} from '../../tag/tag.model';
import {UserModel} from '../../user/user.model';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html'
})
export class UserStatisticComponent implements OnInit {

  tag: Array<TagModel>;
  user: UserModel = new UserModel();
  data:Array<SurveyModel>;
  count;
  countTag;

  constructor(
    private _tagService: TagService,
    private _userService: UserService,
    private _surveyService: SurveyService,
    private router: ActivatedRoute,
    private _logService: AdminlogService
  ) { }

  async ngOnInit() {
    try {
      this.user.UserID = +this.router.snapshot.paramMap.get('id');
      this.tag = <Array<TagModel>> await this._tagService.userTagAsync(this.user);
      this.data = <Array<SurveyModel>>await this._surveyService.surveyReadAsync(this.user);
      this.user = <UserModel> await this._userService.findAsync(this.user);
      this.count = this.data.length;
      this.countTag = this.tag.length;

      await this.onChangeTable(this.config);
      await this.onChangeTableTag(this.configTag);

    } catch (error) {
      await this._logService.createLogAsync(error['message'],'User Statistic',0);
    }
  }

  public rows:Array<any> = [
  ];
  public columns:Array<any> = [
    {title: 'Survey Name', name: 'SurveyName'},
    {title: 'Start Date', name: 'SurveyStartDate'},
    {title: 'Due Date', name: 'SurveyDueDate'}
    ];

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered', 'm-b-0']
  };

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    this.numPages = (page.itemsPerPage) ? page.itemsPerPage : this.numPages;
    page = (page.page) ? page.page : page;
    let start = (page - 1) * this.itemsPerPage;
    let end = this.itemsPerPage > -1 ? (start + this.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {

    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);

    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }


  public rowsTag:Array<any> = [
  ];
  public columnsTag:Array<any> = [
    {title: 'Tag Name', name: 'TagName'},
    {title: 'Category Name', name: 'CategoryName'},
    ];

  public pageTag:number = 1;
  public itemsPerPageTag:number = 10;
  public maxSizeTag:number = 5;
  public numPagesTag:number = 1;
  public lengthTag:number = 0;

  public configTag:any = {
    paging: true,
    sorting: {columns: this.columnsTag},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered', 'm-b-0']
  };

  public changePageTag(page:any, data:Array<any> = this.tag):Array<any> {
    this.numPagesTag = (page.itemsPerPage) ? page.itemsPerPage : this.numPagesTag;
    page = (page.page) ? page.page : page;
    let start = (page - 1) * this.itemsPerPageTag;
    let end = this.itemsPerPageTag > -1 ? (start + this.itemsPerPageTag) : data.length;
    return data.slice(start, end);
  }

  public changeSortTag(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.configTag.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilterTag(data:any, config:any):any {
    let filteredData:Array<any> = data;

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.configTag.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columnsTag.forEach((column:any) => {
        if (item[column.name].toString().match(this.configTag.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTableTag(config:any, page:any = {page: this.pageTag, itemsPerPage: this.itemsPerPageTag}):any {

    if (config.filtering) {
      Object.assign(this.configTag.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.configTag.sorting, config.sorting);
    }

    let filteredData = this.changeFilterTag(this.tag, this.configTag);
    let sortedData = this.changeSortTag(filteredData, this.configTag);

    this.rowsTag = page && config.paging ? this.changePageTag(page, sortedData) : sortedData;
    this.lengthTag = sortedData.length;
  }
}

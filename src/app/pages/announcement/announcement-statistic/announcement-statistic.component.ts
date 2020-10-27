import { Component } from '@angular/core';
import {UserModel} from '../../user/user.model';
import {AnnouncementModel} from '../announcement.model';
import { AnnouncementService } from '../../../utils/services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'announcement-statistic',
  templateUrl: './announcement-statistic.component.html'
})

export class AnnouncementStatisticComponent {
  data:Array<UserModel>;
  user: UserModel = new UserModel();
  announcement: AnnouncementModel = new AnnouncementModel();
  count;
  public constructor(private router: Router, private _announcementService: AnnouncementService , private _router: ActivatedRoute  )
  {}

  async ngOnInit(){
    try {
      this.announcement.AnnouncementID = +this._router.snapshot.paramMap.get('id');
      this.data = <Array<UserModel>>await this._announcementService.statisticAsync(this.announcement);
      this.count = this.data.length;
      await this.onChangeTable(this.config);
    } catch (error) {
    }
  };

  public rows:Array<any> = [
  ];
  public columns:Array<any> = [
    {title: 'Name', name: 'UserName'},
    {title: 'Surname', name: 'UserSurname'},
    {title: 'Profession', name: 'UserProfession'},
    {title: 'City', name: 'UserCity'}
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

    // simple sorting
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
}

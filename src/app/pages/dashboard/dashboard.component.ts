import { Component } from '@angular/core';
import * as global from '../../config/globals';
import {DashboardService,AdminlogService} from '../../utils/services';
import {DashboardModel} from './dashboard.model';
import {TagstatisticModel} from './tagstatistic.model';
import {SelectModel} from './select.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent {
  lat: number = 39.9256934;
  lng: number =  32.8343259;
  mapStyles = [{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#2d353c"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#d8d8d8"}]},{featureType:"administrative.neighborhood",elementType:"geometry.fill",stylers:[{color:"#ff0000"}]},{featureType:"administrative.land_parcel",elementType:"geometry.fill",stylers:[{color:"#2d353c"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{color:"#2d353c"}]},{featureType:"landscape",elementType:"labels.text.fill",stylers:[{color:"#00acac"}]},{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{color:"#2d353c"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{color:"#2d353c"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#575d63"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#348fe2"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.highway.controlled_access",elementType:"geometry.fill",stylers:[{color:"#575d63"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#575d63"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#575d63"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"transit",elementType:"geometry.fill",stylers:[{color:"#2d353c"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#1a1f23"}]}];
  global = global;
  chartColor;
  dashboard: DashboardModel = new DashboardModel();
  chartData:Array<TagstatisticModel>;
  select: SelectModel = new SelectModel();
  constructor(
    private _dashboard: DashboardService,
    private _logService: AdminlogService
    ){}

  async ngOnInit() {
    this.chartColor = { domain: [global.COLOR_BLUE, global.COLOR_GREEN, global.COLOR_PURPLE,global.COLOR_YELLOW_TRANSPARENT_1 ,  global.COLOR_BLACK, global.COLOR_RED, global.COLOR_RED_TRANSPARENT_1 , global.COLOR_ORANGE_LIGHTER] };

    try {
      this.dashboard = <DashboardModel>await this._dashboard.dashboardAsync();
      this.chartData = <Array<TagstatisticModel>> await this._dashboard.tagStatisticAsync(this.select);
      await this._logService.createLogAsync(null,'Dashboard',1);
    }catch (error) {
      await this._logService.createLogAsync(error['message'],'Dashboard',0);
    }
  }

  async data(ID:number){
    this.select.selectID=ID;
    this.chartData = <Array<TagstatisticModel>> await this._dashboard.tagStatisticAsync(this.select);
  }
}

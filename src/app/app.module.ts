// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule }               from '@angular/platform-browser/animations';
import { BrowserModule, Title }                  from '@angular/platform-browser';
import { AppRoutingModule }                      from './app-routing.module';
import { NgbModule }                             from '@ng-bootstrap/ng-bootstrap';
import { NgModule }                              from '@angular/core';
import { FormsModule, ReactiveFormsModule }      from '@angular/forms';
import { MatSortModule, MatTableModule }         from '@angular/material';
import * as global                               from './config/globals';

// Main Component
import { AppComponent }                    from './app.component';
import { HeaderComponent }                 from './components/header/header.component';
import { SidebarComponent }                from './components/sidebar/sidebar.component';
import { SidebarRightComponent }           from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent }                from './components/top-menu/top-menu.component';
import { FooterComponent }                 from './components/footer/footer.component';
import { PanelComponent }                  from './components/panel/panel.component';
import { FloatSubMenuComponent }           from './components/float-sub-menu/float-sub-menu.component';


// Component Module
import { AgmCoreModule }                   from '@agm/core';
import { FullCalendarModule }              from '@fullcalendar/angular';
import { LoadingBarRouterModule }          from '@ngx-loading-bar/router';
import { NgxChartsModule }                 from '@swimlane/ngx-charts';
import { TrendModule }                     from 'ngx-trend';
import { CountdownModule }                 from 'ngx-countdown';
import { ChartsModule }                    from 'ng4-charts/ng4-charts';
import { TagInputModule }                  from 'ngx-chips';
import { SweetAlert2Module }               from '@sweetalert2/ngx-sweetalert2';
import { Ng2TableModule }                  from 'ngx-datatable/ng2-table';
import { NvD3Module }                      from 'ng2-nvd3';
import { NgxDaterangepickerMd }            from 'ngx-daterangepicker-material';
import 'd3';
import 'nvd3';
import { CalendarModule, DateAdapter }     from 'angular-calendar';
import { adapterFactory }                  from 'angular-calendar/date-adapters/date-fns';
import { PerfectScrollbarModule }          from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG }        from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { HttpClient, HttpClientModule } from '@angular/common/http';


// Pages
import {StatisticComponent} from './pages/statistic/statistic.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AnnouncementComponent} from './pages/announcement/announcement.component';
import {CategoryComponent} from './pages/category/category.component';
import {TagComponent} from './pages/tag/tag.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {EventComponent} from './pages/event/event.component';
import {AdminlogComponent} from './pages/log/adminlog/adminlog.component';
import {ServelogComponent} from './pages/log/servelog/servelog.component';
import {DatabotlogComponent} from './pages/log/databotlog/databotlog.component';
import {NewsComponent} from './pages/news/news.component';
import {SportComponent} from './pages/sport/sport.component';
import {SurveyComponent} from './pages/survey/survey.component';
import {UserComponent} from './pages/user/user.component';
import {LoginComponent} from './pages/login/login.component';
import {LeagueComponent} from './pages/league/league.component';
import {CategoryAddComponent} from './pages/category/category-add/category-add.component';
import {TagAddComponent} from './pages/tag/tag-add/tag-add.component';
import {AnnouncementAddComponent} from './pages/announcement/announcement-add/announcement-add.component';
import {SurveyAddComponent} from './pages/survey/survey-add/survey-add.component';
import {SportAddComponent} from './pages/sport/sport-add/sport-add.component';
import {LeagueAddComponent} from './pages/league/league-add/league-add.component';
import {EventAddComponent} from './pages/event/event-add/event-add.component';
import {AdminAddComponent} from './pages/admin/admin-add/admin-add.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    FloatSubMenuComponent,

    StatisticComponent,
    AdminComponent,
    AnnouncementComponent,
    CategoryComponent,
    TagComponent,
    DashboardComponent,
    EventComponent,
    AdminlogComponent,
    ServelogComponent,
    DatabotlogComponent,
    NewsComponent,
    SportComponent,
    SurveyComponent,
    UserComponent,
    LoginComponent,
    LeagueComponent,

    CategoryAddComponent,
    TagAddComponent,
    AnnouncementAddComponent,
    SurveyAddComponent,
    SportAddComponent,
    LeagueAddComponent,
    EventAddComponent,
    AdminAddComponent
  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk' }),
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountdownModule,
    ChartsModule,
    FullCalendarModule,
    FormsModule,
    LoadingBarRouterModule,
    MatSortModule,
    MatTableModule,
    NgbModule,
    NvD3Module,
    NgxChartsModule,
    Ng2TableModule,
    NgxDaterangepickerMd.forRoot(),
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    TagInputModule,
    TrendModule,
    HttpClientModule
  ],
  providers: [ Title, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        var title = 'Dailyathon | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}

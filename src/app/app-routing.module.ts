import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
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
import { AuthGuard } from './utils/guards/';

import {CategoryAddComponent} from './pages/category/category-add/category-add.component';
import {TagAddComponent} from './pages/tag/tag-add/tag-add.component';
import {AnnouncementAddComponent} from './pages/announcement/announcement-add/announcement-add.component';
import {SurveyAddComponent} from './pages/survey/survey-add/survey-add.component';
import {SportAddComponent} from './pages/sport/sport-add/sport-add.component';
import {LeagueAddComponent} from './pages/league/league-add/league-add.component';
import {EventAddComponent} from './pages/event/event-add/event-add.component';
import {AdminAddComponent} from './pages/admin/admin-add/admin-add.component';

import {CategoryUpdateComponent} from './pages/category/category-update/category-update.component';
import {SurveyUpdateComponent} from './pages/survey/survey-update/survey-update.component';
import {AnnouncementUpdateComponent} from './pages/announcement/announcement-update/announcement-update.component';
import {AdminUpdateComponent} from './pages/admin/admin-update/admin-update.component';
import {LeagueUpdateComponent} from './pages/league/league-update/league-update.component';
import {SurveyStatisticComponent} from './pages/survey/survey-statistic/survey-statistic.component';
import {AnnouncementStatisticComponent} from './pages/announcement/announcement-statistic/announcement-statistic.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'statistic', component: StatisticComponent, canActivate:[AuthGuard], data: { title: 'Statistic'} },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data: { title: 'Admin'} },
  { path: 'announcement', component: AnnouncementComponent, canActivate:[AuthGuard], data: { title: 'Announcement'} },
  { path: 'category', component: CategoryComponent, canActivate:[AuthGuard], data: { title: 'Category'} },
  { path: 'tag', component: TagComponent, canActivate:[AuthGuard], data: { title: 'Tag'} },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], data: { title: 'Dashboard'} },
  { path: 'event', component: EventComponent, canActivate:[AuthGuard],data: { title: 'Event'} },
  { path: 'adminlog', component: AdminlogComponent, canActivate:[AuthGuard], data: { title: 'Admin Log'} },
  { path: 'servelog', component: ServelogComponent, canActivate:[AuthGuard], data: { title: 'Serve Log'} },
  { path: 'databotlog', component: DatabotlogComponent, canActivate:[AuthGuard], data: { title: 'Databot Log'} },
  { path: 'sport', component: SportComponent, canActivate:[AuthGuard], data: { title: 'Sport'} },
  { path: 'news', component: NewsComponent, canActivate:[AuthGuard], data: { title: 'News'} },
  { path: 'survey', component: SurveyComponent, canActivate:[AuthGuard], data: { title: 'Survey'} },
  { path: 'user', component: UserComponent, canActivate:[AuthGuard], data: { title: 'User'} },
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard], data: { title: 'Login'} },
  { path: 'league', component: LeagueComponent, canActivate:[AuthGuard], data: { title: 'League'} },

  { path: 'categoryAdd', component: CategoryAddComponent, canActivate:[AuthGuard], data: { title: 'Category Add'} },
  { path: 'tagAdd', component: TagAddComponent, canActivate:[AuthGuard], data: { title: 'Tag Add'} },
  { path: 'announcementAdd', component: AnnouncementAddComponent, canActivate:[AuthGuard], data: { title: 'Announcement Add'} },
  { path: 'surveyAdd', component: SurveyAddComponent, canActivate:[AuthGuard], data: { title: 'Survey Add'} },
  { path: 'sportAdd', component: SportAddComponent, canActivate:[AuthGuard], data: { title: 'Sport Add'} },
  { path: 'leagueAdd', component: LeagueAddComponent, canActivate:[AuthGuard], data: { title: 'League Add'} },
  { path: 'eventAdd', component: EventAddComponent, canActivate:[AuthGuard], data: { title: 'Event Add'} },
  { path: 'adminAdd', component: AdminAddComponent, canActivate:[AuthGuard], data: { title: 'Admin Add'} },

  { path: 'categoryDetails/:id', component: CategoryUpdateComponent, canActivate:[AuthGuard], data: { title: 'Category Update'} },
  { path: 'surveyDetails/:id', component: SurveyUpdateComponent, canActivate:[AuthGuard], data: { title: 'Survey Update'} },
  { path: 'announcementDetails/:id', component: AnnouncementUpdateComponent, canActivate:[AuthGuard], data: { title: 'Announcement Update'} },
  { path: 'adminDetails/:id', component: AdminUpdateComponent, canActivate:[AuthGuard], data: { title: 'Admin Update'} },
  { path: 'leagueDetails/:id', component: LeagueUpdateComponent, canActivate:[AuthGuard], data: { title: 'League Update'} },
  { path: 'surveyStatistic/:id', component: SurveyStatisticComponent, canActivate:[AuthGuard], data: { title: 'Survey Statistic'} },
  { path: 'announcementStatistic/:id', component: AnnouncementStatisticComponent, canActivate:[AuthGuard], data: { title: 'Announcement Statistic'} },

];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }

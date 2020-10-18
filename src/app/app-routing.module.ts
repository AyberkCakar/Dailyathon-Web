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

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'statistic', component: StatisticComponent, data: { title: 'Statistic'} },
  { path: 'admin', component: AdminComponent, data: { title: 'Admin'} },
  { path: 'announcement', component: AnnouncementComponent, data: { title: 'Announcement'} },
  { path: 'category', component: CategoryComponent, data: { title: 'Category'} },
  { path: 'tag', component: TagComponent, data: { title: 'Tag'} },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'} },
  { path: 'event', component: EventComponent, data: { title: 'Event'} },
  { path: 'adminlog', component: AdminlogComponent, data: { title: 'Admin Log'} },
  { path: 'servelog', component: ServelogComponent, data: { title: 'Serve Log'} },
  { path: 'databotlog', component: DatabotlogComponent, data: { title: 'Databot Log'} },
  { path: 'sport', component: SportComponent, data: { title: 'Sport'} },
  { path: 'news', component: NewsComponent, data: { title: 'News'} },
  { path: 'survey', component: SurveyComponent, data: { title: 'Survey'} },
  { path: 'user', component: UserComponent, data: { title: 'User'} },

];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }

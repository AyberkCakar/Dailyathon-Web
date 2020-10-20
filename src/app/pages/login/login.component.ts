import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import pageSettings from '../../config/page-settings';
import { AuthService } from '../../utils/services';
import { LoginModel } from './login.model';


@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
  bg;
  app;
  pageSettings = pageSettings;

  constructor(private router: Router,  private _authService: AuthService) {
    this.pageSettings.pageEmpty = true;
  }
  model: LoginModel = new LoginModel();
  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
  }

  ngOnInit() {
    this.bg = '/assets/img/login-bg/login-bg-17.jpg';
  }

  onLogin(_Username:string,_password:string) {
    this.model.Username=_Username;
    this.model.Password=_password;
    this._authService.login(this.model);

  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import pageSettings from '../../config/page-settings';
import { AuthService } from '../../utils/services';
import { LoginModel } from './login.model';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
  bg;
  app;
  pageSettings = pageSettings;

  constructor(private router: Router,  private _authService: AuthService , private notifier: NotifierService ) {
    this.pageSettings.pageEmpty = true;
  }
  model: LoginModel = new LoginModel();
  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  ngOnInit() {
    this.bg = '/assets/img/login-bg/login-bg-17.jpg';
  }

  async onLogin(_Username: string , _password: string) {
    this.model.Username = _Username;
    this.model.Password = _password;
    try {
      const response = await this._authService.login(this.model);
      if(response.status!=404)
      {
        await this.showNotification( 'success', 'Login Successful !' );
      }
      if(response.userInformation == null)
      {
        this.showNotification( 'error', response.message );
      }
    }catch (error) {
      this.showNotification( 'error', error.message );
    }
  }
}

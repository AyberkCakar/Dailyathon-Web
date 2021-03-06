import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _router: Router,
  ) {}

  async login(user) {
    try {
      const respone: any = await this._apiFetchService.requestAsync(
        'POST',
        'login/admin',
        user
      );
      localStorage.setItem('token', respone.token);
      localStorage.setItem('AdminID', respone.userInformation.AdminID);
      localStorage.setItem('AdminName', respone.userInformation.AdminName);
      localStorage.setItem('AdminAuth', respone.userInformation.AdminAuth);
      localStorage.setItem('AdminPosition', respone.userInformation.AdminPosition);
      this._router.navigateByUrl('dashboard');
      return respone;
    } catch (error) {
      return error;
    }
  }

  async tokenDecode() {
    try {
      if (localStorage.getItem('token') != null) {
        const response: any = await this._apiFetchService.requestAsync(
          'GET',
          'token-decode',
          null,
          true
        );
        return response;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

import { Component } from '@angular/core';
import {AdminModel} from '../admin.model';
import { AdminService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-update',
  templateUrl: './admin-update.component.html'
})

export class AdminUpdateComponent {
  date: Date = new Date();
  model: AdminModel = new AdminModel();
  constructor(private router: Router, private _adminService: AdminService )
  {}

  async ngOnInit(){
  }
}

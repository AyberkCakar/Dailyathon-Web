import { formatDate } from '@fullcalendar/core';
import { Format } from '@syncfusion/ej2-angular-spreadsheet';

export class UserModel {
  UserID: number;
  UserName: string;
  UserSurname: string;
  UserMail: string;
  UserDate: Date;
  UserProfession: string;
  UserCity: string;
  RegDate: Date['setFullYear'];
}

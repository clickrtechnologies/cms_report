import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/models/admin-models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor() {}

  getUserLogins(): UserLogin[] {
    return [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        username: 'admin',
        password: '123456'
      },
      {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        username: 'superadmin',
        password: 'admin@123'
      }
    ];
  }
}

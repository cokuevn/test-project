import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../shared/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  url = environment.apiUrl + '/users';
  constructor(public http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.url);
  }
}

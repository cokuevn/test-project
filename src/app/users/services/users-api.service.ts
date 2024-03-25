import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly url = environment.apiUrl + '/users';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.url);
  }
}

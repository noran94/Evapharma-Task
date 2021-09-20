import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersComponent } from '../components/users/users.component';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'users';
  constructor(private http: HttpClient) { }
  getUsers(pageEvent: PageEvent) {
    const params = new HttpParams()
      .append('page', pageEvent.pageIndex ? pageEvent.pageIndex + 1 : 1)
      .append('per_page', pageEvent.pageSize || 10);
    return this.http.get(this.url, { params });
  }
  getUserByID(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  addUser(user:User) {
    return this.http.post(this.url, user);

  }
  editUser(id: number, user: User) {
    return this.http.put(`${this.url}/${id}`, user);

  }
  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

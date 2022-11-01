import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  UrlApi = 'http://localhost:8000/api/';
  token = localStorage.getItem('token');
  constructor(private httpClient: HttpClient) {}

  getAllUsers() {
    const data = this.httpClient.get(this.UrlApi + 'get-users').pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
    return data;
  }

  saveUser(user: IUser) {
    const data = this.httpClient.post(this.UrlApi + 'register', user).pipe(
      map((response) => {
        return response;
      })
    );
    return data;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUser } from './../models/user.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  UrlApi = 'http://localhost:8000/api/';
  token = localStorage.getItem('token');
  private refresh$ = new Subject<void>();
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
      }),
      tap(() => {
        this.refresh$.next();
      })
    );
    return data;
  }

  getUserById(id: number) {
    const data = this.httpClient.get(this.UrlApi + `get-user/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
    return data;
  }

  editUser(user: any, id: number) {
    const data = this.httpClient
      .put(this.UrlApi + `edit-user/${id}`, user)
      .pipe(
        map((response) => {
          return response;
        })
      );
    return data;
  }

  deleteUser(id: number) {
    const data = this.httpClient.delete(this.UrlApi + `delete-user/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
    return data;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  UrlApi = 'http://localhost:8000/api/';
  token = localStorage.getItem('token');
  constructor(private httpClient: HttpClient) {}

  getAllUsers() {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this.token);
    const data = this.httpClient
      .get(this.UrlApi + 'get-users', { headers: httpHeaders })
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
    return data;
  }
}

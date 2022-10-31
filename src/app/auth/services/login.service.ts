import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  UrlApi = 'http://localhost:8000/api/';

  constructor(private httClient: HttpClient) {}

  login(email: any, password: any) {
    const params = {
      email: email,
      password: password,
    };
    const data = this.httClient.post(this.UrlApi + 'login', params).pipe(
      map((response) => {
        return response;
      })
    );
    return data;
  }
}

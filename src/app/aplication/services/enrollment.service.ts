import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  UrlApi = 'http://localhost:8000/api/';
  constructor(private httpClient: HttpClient) {}
  saveEnrollments(value: any) {
    const data = this.httpClient
      .post(this.UrlApi + 'save-enrollment', value)
      .pipe(
        map((response) => {
          return response;
        })
      );
    return data;
  }

  getAllEnrollments() {
    const data = this.httpClient.get(this.UrlApi + 'get-enrollments').pipe(
      map((response) => {
        return response;
      })
    );
    return data;
  }

  deleteEnrollment(id: number) {
    const data = this.httpClient
      .delete(this.UrlApi + `delete-enrollment/${id}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
    return data;
  }
}

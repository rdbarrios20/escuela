import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICourse } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  UrlApi = 'http://localhost:8000/api/';
  constructor(private httpClient: HttpClient) {}

  getCourses() {
    const data = this.httpClient.get(this.UrlApi + 'get-courses').pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
    return data;
  }

  saveCourse(course: ICourse) {
    const data = this.httpClient
      .post(this.UrlApi + 'create-course', course)
      .pipe(
        map((response) => {
          return response;
        })
      );
    return data;
  }

  editCourses(course: any, id: number) {
    const data = this.httpClient
      .put(this.UrlApi + `edit-course/${id}`, course)
      .pipe(
        map((response) => {
          return response;
        })
      );
    return data;
  }

  getCourseById(id: number) {
    const data = this.httpClient.get(this.UrlApi + `get-course/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
    return data;
  }

  deleteCourse(id: number) {
    const data = this.httpClient
      .delete(this.UrlApi + `delete-course/${id}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
    return data;
  }
}

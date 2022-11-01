import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../models/course.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  createVisible: boolean = false;
  editVisible: boolean = false;
  public formCourse: FormGroup = new FormGroup({});
  public courseList: Array<ICourse> = [];
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCoursesList();
  }

  buildForm(): void {
    this.formCourse = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      hourly_intensity: new FormControl('', [Validators.required]),
    });
  }

  getCoursesList() {
    this.courseService.getCourses().subscribe((data: any) => {
      if (data) {
        this.courseList = data.courses;
        console.log(this.courseList);
      }
    });
  }

  createCourse(): void {
    this.createVisible = true;
    this.editVisible = false;
    if (this.formCourse.valid) {
      this.courseService
        .saveCourse(this.formCourse.value)
        .subscribe((data: any) => {
          if (data.course) {
            this.formCourse.reset(this.formCourse.value);
            Swal.fire('Curso registrado exitosamente');
            this.getCoursesList();
          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes revisar los datos',
      });
    }
  }

  editCourse(): void {
    this.createVisible = false;
    this.editVisible = true;
    if (this.formCourse.valid) {
      this.courseService
        .editCourses(this.formCourse.value, this.formCourse.value.id)
        .subscribe((data: any) => {
          if (data.message) {
            this.formCourse.reset(this.formCourse.value);
            Swal.fire('Curso actualizado exitosamente');
            this.getCoursesList();
          }
        });
    }
  }

  getCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe((data: any) => {
      if (data.course) {
        this.formCourse.patchValue({
          id: data.course.id,
          name: data.course.name,
          hourly_intensity: data.course.hourly_intensity,
        });
      }
    });
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe((data: any) => {
      if (data.message) {
        this.formCourse.reset(this.formCourse.value);
        Swal.fire('Curso eliminado exitosamente');
        this.getCoursesList();
      }
    });
  }

  changeState() {
    this.createVisible = true;
    this.editVisible = false;
  }
}

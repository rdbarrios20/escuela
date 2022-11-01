import { EnrollmentService } from './../../services/enrollment.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css'],
})
export class EnrollmentsComponent implements OnInit {
  public formEnrollment: FormGroup = new FormGroup({});
  userList: any = [];
  coursesList: any = [];
  enrollmentList: any = [];
  constructor(
    private enrollmentService: EnrollmentService,
    private userService: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getEnrollments();
    this.getUsers();
    this.getCoursesList();
    this.buildForm();
  }

  buildForm(): void {
    this.formEnrollment = new FormGroup({
      id: new FormControl(''),
      user: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
    });
  }
  getUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      if (data) {
        this.userList = data;
      }
    });
  }
  getCoursesList() {
    this.courseService.getCourses().subscribe((data: any) => {
      if (data) {
        this.coursesList = data.courses;
        console.log(this.coursesList);
      }
    });
  }

  getEnrollments() {
    this.enrollmentService.getAllEnrollments().subscribe((data: any) => {
      if (data.enrollments) {
        this.enrollmentList = data.enrollments;
      }
    });
  }

  createEnrollment(): void {
    console.log(this.formEnrollment.value);
    this.enrollmentService
      .saveEnrollments(this.formEnrollment.value)
      .subscribe((data: any) => {
        if (data.enrollment) {
          Swal.fire('Usuario matriculado exitosamente');
          this.getEnrollments();
        }
      });
  }

  editEnrollment(): void {}

  deleteErollment(id: number): void {
    this.enrollmentService.deleteEnrollment(id).subscribe((data: any) => {
      if (data.message) {
        Swal.fire('Inscripcion eliminada exitosamente');
        this.getEnrollments();
      }
    });
  }
  changeState(): void {}
}

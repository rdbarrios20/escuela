import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AplicationRoutingModule } from './aplication-routing.module';
import { UsersComponent } from './components/users/users.component';
import { CoursesComponent } from './components/courses/courses.component';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    CoursesComponent,
    EnrollmentsComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    AplicationRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AplicationModule {}

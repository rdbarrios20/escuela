import { UsersComponent } from './components/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'ecourses', component: CoursesComponent },
      { path: 'enrollments', component: EnrollmentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AplicationRoutingModule {}

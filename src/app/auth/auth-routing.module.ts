import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';

const routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot', component: ForgotComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}

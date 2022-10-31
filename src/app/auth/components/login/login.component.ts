import { LoginService } from './../../services/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() login: Login;
  constructor(private loginService: LoginService, private router: Router) {
    this.login = new Login();
  }

  ngOnInit(): void {}

  loginUser() {
    console.log(this.login.email, this.login.password);
    this.loginService
      .login(this.login.email, this.login.password)
      .subscribe((data: any) => {
        if (data.token) {
          const token = data.token;
          const user = data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['aplication/home']);
        }
      });
  }
}

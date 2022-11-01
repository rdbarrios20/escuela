import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList: any = [];
  public formUser: FormGroup = new FormGroup({});
  public showModal: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.getUsers();
  }

  buildForm(): void {
    this.formUser = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeat_password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      if (data) {
        this.userList = data;
      }
    });
  }

  registerUser(): void {
    console.log(this.formUser.value);
    this.userService.saveUser(this.formUser.value).subscribe((data: any) => {});
  }
}

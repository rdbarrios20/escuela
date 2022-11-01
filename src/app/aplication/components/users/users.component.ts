import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList: any = [];
  isVisible: boolean = true;
  createVisible: boolean = false;
  editVisible: boolean = false;
  public formUser: FormGroup = new FormGroup({});
  public showModal: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.getUsers();
  }

  buildForm(): void {
    this.formUser = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      password_confirmation: new FormControl(''),
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      if (data) {
        this.userList = data;
      }
    });
  }

  validateForm(): void {
    if (this.formUser.valid) {
      this.registerUser();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes revisar los datos',
      });
    }
  }

  registerUser(): void {
    this.createVisible = true;
    this.editVisible = false;
    if (this.formUser.valid) {
      this.userService.saveUser(this.formUser.value).subscribe((data: any) => {
        if (data.user) {
          this.formUser.reset(this.formUser.value);
          Swal.fire('Usuario registrado exitosamente');
          this.getUsers();
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

  getUserById(id: number) {
    this.editVisible = true;
    this.createVisible = false;
    this.isVisible = false;
    this.formUser.reset(this.formUser.value);
    this.userService.getUserById(id).subscribe((data: any) => {
      this.formUser.patchValue({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        password: null,
      });
    });
  }

  editUser(): void {
    if (this.formUser.valid) {
      this.userService
        .editUser(this.formUser.value, this.formUser.value.id)
        .subscribe((data: any) => {
          if (data.message) {
            Swal.fire('Usuario editado exitosamente');
            this.getUsers();
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
  cahcgeState() {
    this.createVisible = true;
    this.editVisible = false;
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe((data: any) => {
      if (data.message) {
        Swal.fire('Usuario elimnardo exitosamente');
        this.getUsers();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes revisar los datos',
        });
      }
    });
  }
}

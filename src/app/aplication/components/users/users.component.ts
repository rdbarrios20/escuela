import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Users } from './../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList: any = [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      if (data) {
        this.userList = data;
      }
    });
  }
}

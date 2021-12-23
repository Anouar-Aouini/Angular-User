import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { User } from './user.module';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  public users?: User[]
  public email: string = "";
  public search: string = "";
  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.email = JSON.parse(<string>localStorage.getItem("email"));
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
    this.userService.getUsers().subscribe(data => this.users=data)
  }
}

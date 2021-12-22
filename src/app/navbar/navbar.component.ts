import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showFiller: boolean = false;
  constructor(public route:Router) { }

  ngOnInit(): void {

  }
  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.route.navigate(["/login"])
  }
}

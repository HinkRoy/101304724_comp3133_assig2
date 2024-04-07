import { Component } from '@angular/core';
import {User} from "../type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: User | null = null

  constructor(private router: Router) {
    let user = localStorage.getItem("user")
    if (user) {
      this.user = JSON.parse(user)
    }
  }

  logout() {
    localStorage.removeItem("user")
    this.router.navigateByUrl("/login")
  }
}

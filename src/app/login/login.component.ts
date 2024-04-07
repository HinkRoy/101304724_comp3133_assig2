import { Component } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username,
      email
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ""
  password: string = ""

  constructor(
    private apollo: Apollo,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  login() {
    if (this.username && this.password) {
      this.apollo.query({
        query: LOGIN,
        variables: {
          username: this.username,
          password: this.password,
        }
      }).subscribe((res: any) => {
        if (res.data.login) {
          this._snackBar.open("Login successful!");
          localStorage.setItem("user", JSON.stringify(res.data.login));
          this.router.navigateByUrl('/')
        } else {
          this._snackBar.open("Invalid username or password!");
        }
      }, error => {
        this._snackBar.open("Invalid username or password!");
      })
    }
  }
}

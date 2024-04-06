import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

const SIGN_UP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(user: {
      username: $username,
      email: $email,
      password: $password
    }) {
      id
      username,
      email
    }
  }
`;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = ""
  email: string = ""
  password: string = ""

  constructor(
    private apollo: Apollo,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  signup() {
    if (this.username && this.email && this.password) {
      this.apollo.mutate({
        mutation: SIGN_UP,
        variables: {
          username: this.username,
          email: this.email,
          password: this.password,
        }
      }).subscribe((res: any) => {
        this._snackBar.open("Sign up successful!");
        this.router.navigateByUrl('/login')
      }, error => {
        this._snackBar.open("Sign up error!");
      })
    }
  }
}

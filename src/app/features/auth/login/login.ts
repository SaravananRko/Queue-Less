import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Auth,
  LoginRequest
} from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(Auth);
  private router = inject(Router);


  loginRequest: LoginRequest = {
    mobileNo: '',
    password: ''
  };


  loading = false;

  errorMessage = '';


  login(): void {

    if (
      !this.loginRequest.mobileNo ||
      !this.loginRequest.password
    ) {

      this.errorMessage =
        'Please enter mobile number and password.';

      return;
    }


    this.loading = true;
    this.errorMessage = '';


    this.authService
      .login(this.loginRequest)
      .subscribe({

        next: (response) => {

          console.log(
            'Login successful:',
            response
          );

          console.log(
            'JWT:',
            localStorage.getItem('token')
          );

          this.loading = false;

          this.router.navigate([
            '/staff/dashboard'
          ]);

        },


        error: (error) => {

          console.error(
            'Login failed:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ??
            'Login failed. Please check your credentials.';

        }

      });

  }

}
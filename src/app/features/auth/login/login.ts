import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationCancel, NavigationError, NavigationStart, NavigationEnd } from '@angular/router';
import { Auth, LoginRequest } from '../auth';

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

  constructor() {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        console.log('NavigationStart:', event.url);
      }

      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event.urlAfterRedirects);
      }

      if (event instanceof NavigationCancel) {
        console.error(
          'NavigationCancel:',
          event.url,
          event.reason
        );
      }

      if (event instanceof NavigationError) {
        console.error(
          'NavigationError:',
          event.url,
          event.error
        );
      }

    });

  }

  login(): void {

    if (!this.loginRequest.mobileNo || !this.loginRequest.password) {
      this.errorMessage = 'Please enter mobile number and password.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginRequest).subscribe({

      next: (response) => {

        console.log('Login successful:', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('role', response.role);

        this.loading = false;

        console.log('Navigating to dashboard...');

        this.router.navigateByUrl('/staff/dashboard')
          .then(result => {
            console.log('Navigation result:', result);
          })
          .catch(error => {
            console.error('Navigation error:', error);
          });

      },

      error: (error) => {

        console.error('Login failed:', error);

        this.loading = false;

        this.errorMessage =
          error?.error?.message ??
          'Login failed. Please check your credentials.';
      }

    });

  }
}
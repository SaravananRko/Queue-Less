import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  mobileNo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  userName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7091/api/auth';


  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(

        tap(response => {

          localStorage.setItem(
            'token',
            response.token
          );

          localStorage.setItem(
            'userId',
            response.userId.toString()
          );

          localStorage.setItem(
            'userName',
            response.userName
          );

          localStorage.setItem(
            'role',
            response.role
          );

        })

      );

  }


  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');

  }


  getToken(): string | null {

    return localStorage.getItem('token');

  }


  isLoggedIn(): boolean {

    return !!this.getToken();

  }

}
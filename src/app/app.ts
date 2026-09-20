import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StaffDashboard } from './features/staff/staff-dashboard/staff-dashboard';
import { Login } from './features/auth/login/login';

@Component({
  selector: 'app-root',
  imports: [Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Queue-Less');
}

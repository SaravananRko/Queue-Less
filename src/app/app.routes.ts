import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },

  {
    path: 'staff/dashboard',
    loadComponent: () =>
      import('./features/staff/staff-dashboard/staff-dashboard')
        .then(m => m.StaffDashboard)
  }

];
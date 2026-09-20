import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'staff/dashboard',
    loadComponent: () =>
      import(
        './features/staff/staff-dashboard/staff-dashboard'
      ).then(
        m => m.StaffDashboard
      )
  }

];
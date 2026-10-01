import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Staff, QueueStatus } from '../staff';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-dashboard.html'
})
export class StaffDashboard implements OnInit {

  private staffService = inject(Staff);

  queueId = 1;

  queueStatus: QueueStatus | null = null;

  loading = false;

  ngOnInit(): void {

    console.log('STAFF DASHBOARD LOADED');

    this.loadStatus();
  }

  loadStatus(): void {

    console.log('Loading queue:', this.queueId);

    this.staffService
      .getStatus(this.queueId)
      .subscribe({

        next: (response) => {

          console.log('API RESPONSE:', response);

          this.queueStatus = response;

          console.log(
            'queueStatus assigned:',
            this.queueStatus
          );

        },

        error: (error) => {

          console.error(
            'QUEUE STATUS ERROR:',
            error
          );

        }

      });
  }

  callNext(): void {

    if (this.loading) {
      return;
    }

    this.loading = true;

    this.staffService
      .callNext(this.queueId)
      .subscribe({

        next: (response) => {

          console.log(
            'CALL NEXT RESPONSE:',
            response
          );

          this.loading = false;

          // Reload latest queue data
          this.loadStatus();

        },

        error: (error) => {

          console.error(
            'CALL NEXT ERROR:',
            error
          );

          this.loading = false;

        }

      });
  }
}
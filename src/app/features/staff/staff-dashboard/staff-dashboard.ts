import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Staff,
  QueueTicket
} from '../staff';

@Component({
  standalone: true,
  selector: 'app-staff-dashboard',
  imports: [CommonModule],
  templateUrl: './staff-dashboard.html',
  styleUrl: './staff-dashboard.css',
})

export class StaffDashboard implements OnInit {

  private staffService = inject(Staff);

  queueId = 1;

  currentTicket: QueueTicket | null = null;

  waitingTickets: QueueTicket[] = [];

  loading = false;


  ngOnInit(): void {

    this.loadQueue();

  }


  loadQueue(): void {

    this.staffService
      .getWaitingTickets(this.queueId)
      .subscribe({

        next: (tickets) => {

          this.waitingTickets = tickets;

          this.loadCurrentTicket();

        },

        error: (error) => {

          console.error(
            'Failed to load waiting tickets',
            error
          );

        }

      });

  }


  loadCurrentTicket(): void {

    this.staffService
      .getQueue(this.queueId)
      .subscribe({

        next: (queue) => {

          this.currentTicket =
            queue.currentTicket ?? null;

        },

        error: (error) => {

          console.error(
            'Failed to load current ticket',
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
            'Next customer called',
            response
          );

          this.loadQueue();

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Call next failed',
            error
          );

          this.loading = false;

        }

      });

  }


  complete(): void {

    if (!this.currentTicket) {
      return;
    }

    this.staffService
      .complete(this.currentTicket.ticketId)
      .subscribe({

        next: () => {

          this.currentTicket = null;

          this.loadQueue();

        },

        error: (error) => {

          console.error(
            'Complete failed',
            error
          );

        }

      });

  }


  skip(): void {

    if (!this.currentTicket) {
      return;
    }

    this.staffService
      .skip(this.currentTicket.ticketId)
      .subscribe({

        next: () => {

          this.currentTicket = null;

          this.loadQueue();

        },

        error: (error) => {

          console.error(
            'Skip failed',
            error
          );

        }

      });

  }


  get nextTicket(): QueueTicket | null {

    if (this.waitingTickets.length === 0) {

      return null;

    }

    return this.waitingTickets[0];

  }

}
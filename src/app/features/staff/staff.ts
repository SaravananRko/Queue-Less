import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QueueTicket {
  ticketId: number;
  queueId: number;
  userId: number;
  tokenNo: number;
  status: string;
  joinedTime: string;
  calledTime?: string;
  servingTime?: string;
  completedTime?: string;
  cancelledTime?: string;
}
@Injectable({
  providedIn: 'root',
})
export class Staff {
  private http = inject(HttpClient);

private apiUrl = 'https://localhost:7001/api/queue';


  getQueue(queueId: number): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${queueId}`
    );

  }

  getWaitingTickets(queueId: number): Observable<QueueTicket[]> {

    return this.http.get<QueueTicket[]>(
      `${this.apiUrl}/${queueId}/waiting`
    );

  }

  callNext(queueId: number): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/next?queueId=${queueId}`,
      {}
    );

  }

  complete(ticketId: number): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/ticket/${ticketId}/complete`,
      {}
    );

  }

  skip(ticketId: number): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/ticket/${ticketId}/skip`,
      {}
    );

  }
}

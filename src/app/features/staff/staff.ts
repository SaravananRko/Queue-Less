import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QueueStatus {
  queueId: number;
  businessId: number;
  serviceId: number;
  currentTokenNo: number;
  lastTokenNo: number;
  waitingCount: number;
  myTokenNo: number | null;
  myStatus: string | null;
  position: number | null;
  estimatedWaitMinutes: number;
  queueStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class Staff {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7091/api/Queue';

  getStatus(queueId: number): Observable<QueueStatus> {
    return this.http.get<QueueStatus>(
      `${this.apiUrl}/${queueId}/status`
    );
  }

  callNext(queueId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${queueId}/next`,
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
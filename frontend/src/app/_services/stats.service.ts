import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class StatsService {
  constructor(private http: HttpClient) { }

  getStatsUser(siteId: string) {
    return this.http.get(`${environment.apiUrl}/api/${siteId}/users`);
  }
}

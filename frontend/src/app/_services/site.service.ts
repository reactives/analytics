import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Site } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class SiteService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Site[]>(`${environment.apiUrl}/sites`);
  }

  create (siteName: string, host: string) {
    return this.http.post<Site[]>(`${environment.apiUrl}/sites`, {
      siteName: siteName,
      host: host
    });
  }

  deleteSite(id: string) {
    return this.http.delete(`${environment.apiUrl}/sites/${id}`);
  }

  getId(id: string) {
    return this.http.get<Site>(`${environment.apiUrl}/sites/${id}`);
  }
}
